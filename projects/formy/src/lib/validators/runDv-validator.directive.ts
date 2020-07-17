import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, AbstractControl, FormControlDirective, FormControl, Validator, FormGroup, ValidationErrors } from '@angular/forms';
import { rutValidate } from './rut-helper';

@Directive({
  selector: '[runDvValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RunDvValidatorDirective, multi: true }
  ]
})
export class RunDvValidatorDirective implements Validator {

  constructor() {
  }

  validate(c: FormControl) {
    return runDvValidator(c);
  }
}



  export const runDvValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let run:string = control.get('run').value;
    const dv:string = control.get('dv').value;
    if (!run || !dv){
      return null;
    }
    if (!rutValidate(`${run}-${dv}`)){
      return { 'runDvValidator': { value: control.value } }
    }
    return null;
  };


