import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormyService } from './formy.service';
import { FormyInputBase } from './model/model';

@Component({
  selector: 'lib-formy',
  templateUrl: './formy.component.html',
  styleUrls: ['./formy.component.css']
})
export class FormyComponent implements OnInit, OnChanges {

  @Input() questions: FormyInputBase<string>[];
  @Input() questionsJson: string;
  @Input() disabled = false;
  @Input() checkConditions = true;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: FormyService) { }

  ngOnInit() {
    if (!this.questions && !this.questionsJson) {
      return;
    }
    if (!!this.questions && !!this.questionsJson) {
      console.log('Only questions input is used.')
    }
    if (!this.questions && !!this.questionsJson) {
      this.questions = JSON.parse(this.questionsJson);
    }
    this.form = this.qcs.toFormGroup(this.questions);
    if (this.disabled) {
      this.form.disable();
    }
    this.form.valueChanges.subscribe(val => {
      if (this.form.valid) {
        this.questions.forEach(p => {
          if (p.controlType === 'multiple') {
            const checkArray: FormArray = this.form.get(p.key) as FormArray;
            for (let index = 0; index < p.options.length; index++) {
              let option = checkArray.controls.filter((c: any) => c.name === p.options[index].key)[0];
              p.options[index].value = !!option;
            }
          } else {
            p.value = this.form.controls[p.key].value;
          }
        });
        this.onChange.emit(this.questions);
      } else {
        this.onChange.emit(undefined);
      }
    });
  }

  checkForm() {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
  checkFormAndEmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.onChange.emit(this.questions);
    } else {
      this.onChange.emit(undefined);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!this.questions) {
      this.form = this.qcs.toFormGroup(this.questions);
    }
  }


  evaluateLogicalExpression(expression, values) {
    // Replace AND, OR with JavaScript logical operators
    let formattedExpression = expression
      .replace(/\s+/g, '') // Remove whitespace
      .replace(/AND/g, '&&')
      .replace(/OR/g, '||');
    formattedExpression = formattedExpression
      .replace(/<=/g, '<=') // Less than or equal
      .replace(/>=/g, '>=') // Greater than or equal
      .replace(/</g, '<') // Less than
      .replace(/>/g, '>'); // Greater than
    // Replace variables with their corresponding boolean values
    for (const [key, value] of Object.entries(values)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      formattedExpression = formattedExpression.replace(regex, JSON.stringify(value));
    }
    // Evaluate the expression safely
    try {
      return Function('"use strict";return (' + formattedExpression + ')')();
    } 
    catch {
      console.log('Malformed expression or values: ' + expression)
      console.log(values);
      return true;
    }
  }

  checkCondition(question: FormyInputBase<any>) {
    if (!question.condition || !this.checkConditions) {
      return true;
    }


    const values = {};
    this.questions.forEach(p => {
      if (!!this.form.controls[p.key].value){
        values[p.key] = this.form.controls[p.key].value;
      }else{
        values[p.key] = undefined;
      }
    });
    let meetCondition = this.evaluateLogicalExpression(question.condition, values);
    if (!meetCondition) {
      this.form.controls[question.key].setValidators(null);
      this.form.controls[question.key].updateValueAndValidity();
      return false;
    } else {
      if (question.required) {
        this.form.controls[question.key].setValidators(Validators.required);
        this.form.controls[question.key].updateValueAndValidity();
      }
      return true;
    }
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
