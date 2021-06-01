import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, AbstractControl, FormControlDirective, FormControl, Validator, ValidationErrors } from '@angular/forms';
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
    
  }

  validate(c: FormControl) {
    return rutValidator(c);
  }
}

export function rutValidator(control: AbstractControl): ValidationErrors | null{
    let val: string = control.value;
    if (!rutValidate(val)){
      return { 'rutValidator': { value: control.value } }
    }
    return null;
}

