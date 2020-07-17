import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormyInputBase } from '../model/model';


@Component({
  selector: 'app-formy-input',
  templateUrl: './formy-input.component.html',
  styleUrls: ['./formy-input.component.css']
})
export class FormyInputComponent {
  @Input() question: FormyInputBase<string>;
  @Input() form: FormGroup;
  scale: number[] = [];

  get isValid() { return this.form.controls[this.question.key].valid; }

  numbers(){
    this.scale = [];
    if (!!this.question && this.question.controlType === 'scale') {
      const size = this.question.max - this.question.min;
      for (let index = 0; index <= size; index++) {
        this.scale[index] = index + this.question.min;
      }
    }
    return this.scale;
  }
}
