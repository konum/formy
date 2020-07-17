import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormyInputComponent } from './formy-input/formy-input.component';
import { RunDvValidatorDirective } from './validators/runDv-validator.directive';
import { FormyComponent } from './formy.component';
import { FormyEditorComponent } from './editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FormyComponent,FormyInputComponent, RunDvValidatorDirective,FormyEditorComponent],
  exports: [FormyComponent, FormyEditorComponent]
})
export class FormyModule { }
