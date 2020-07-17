import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, AbstractControl, FormControlDirective, FormControl, Validator } from '@angular/forms';
import { rutValidate } from './rut-helper';

@Directive({
  selector: '[rutValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RutValidatorDirective, multi: true }
  ]
})
export class RutValidatorDirective implements Validator {

  validator: ValidatorFn;
  constructor() {
    this.validator = rutValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let val: string = control.value;
    if (!rutValidate(val)){
      return { 'rutValidator': { value: control.value } }
    }
    return null;
  };
}

