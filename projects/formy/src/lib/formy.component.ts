import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormyInputBase } from './model/model';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { FormyService } from './formy.service';

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
    if (!!this.questions && !!this.questionsJson){
      console.log('Only questions input is used.')
    }
    if (!this.questions && !!this.questionsJson){
      this.questions = JSON.parse(this.questionsJson);
    }
    this.form = this.qcs.toFormGroup(this.questions);
    if (this.disabled) {
      this.form.disable();
    }
    this.form.valueChanges.subscribe(val => {
      if (this.form.valid) {
        this.questions.forEach(p => {
          if (p.controlType === 'multiple'){
            const checkArray: FormArray = this.form.get(p.key) as FormArray;
            for (let index = 0; index < p.options.length; index++) {
              let option = checkArray.controls.filter((c: any)=>c.name === p.options[index].key)[0];
              p.options[index].value = !!option;
            }
          }else{
            p.value = this.form.controls[p.key].value;
          }
        });
        this.onChange.emit(this.questions);
      } else {
        this.onChange.emit(undefined);
      }
    });
  }

  checkForm(){
    this.form.markAllAsTouched();
    return this.form.valid;
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
    const key = question.condition.split('=')[0];
    const value = question.condition.split('=')[1];
    if (!this.form.controls[key]) {
      return true;
    }
    const meetCondition = this.form.controls[key].value === value;
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
