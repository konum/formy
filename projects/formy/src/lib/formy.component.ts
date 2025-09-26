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

  checkCondition(question: FormyInputBase<any>) {
    if (!question.condition) {
      return true;
    }
    let igualdad = '=';
    if (question.condition.includes('<='))
      igualdad = '<='
    if (question.condition.includes('>='))
      igualdad = '>='
    const key = question.condition.split(igualdad)[0];
    const value = question.condition.split(igualdad)[1];
    if (!this.form.controls[key]) {
      return true;
    }
    let meetCondition = `${this.form.controls[key].value}` === value;
    if (igualdad==='<=')
        meetCondition = `${this.form.controls[key].value}` <= value;
    if (igualdad==='>=')
        meetCondition = `${this.form.controls[key].value}` >= value;
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
