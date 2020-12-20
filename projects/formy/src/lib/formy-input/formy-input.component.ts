import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
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
  options: any;

  ngOnInit() {
    if (this.question.controlType === 'multiple') {
      this.options = this.question.options.map(p => {
        return { name: p.key, value: !!p.value ? p.value : false };
      });
    }
  }

  onCheckboxChange(name, e) {
    const checkArray: FormArray = this.form.get(this.question.key) as FormArray;
    checkArray.markAsTouched();
    checkArray.markAsDirty();
    if (e.target.checked) {
      let control : any = new FormControl(e.target.value);
      control.name = name;
      checkArray.push(control);
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.name === name) {
          checkArray.removeAt(i);
        }
        i++;
      });
    }
    this.form.updateValueAndValidity({emitEvent:true});
  }

  get isValid() { return this.form.controls[this.question.key].valid; }

  numbers() {
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
