import { Injectable } from '@angular/core';
import { FormyInputBase } from './model/model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RunDvValidatorDirective, runDvValidator } from './validators/runDv-validator.directive';

@Injectable({
  providedIn: 'root'
})
export class FormyService {

  constructor() { }

  toFormGroup(questions: FormyInputBase<string>[] ) {
    let group: any = {};

    questions.forEach(question => {
      const validators = [];
        if (!!question.min){
          validators.push( Validators.min(question.min));
        }
        if (!!question.max){
          validators.push( Validators.max(question.max));
        }
        if (question.required){
          if (question.controlType === 'checkbox')
            validators.push(Validators.requiredTrue);
          else
            validators.push(Validators.required);
        }
      if (question.controlType!=='multiple'){
          group[question.key] = new FormControl(question.value || '', validators);
      }else{
        question.options.forEach((opt,index) => {
          group[question.key+index] = new FormControl(opt.value || '', validators);
        });
      }
    });
    const form = new FormGroup(group);
    if (!!group['run'] && !!group['dv']){
      form.setValidators([runDvValidator]);
    }
    return form;
  }
}
