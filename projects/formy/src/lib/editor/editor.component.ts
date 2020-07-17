import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormyInputBase } from '../model/model';
@Component({
  selector: 'lib-formy-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class FormyEditorComponent implements OnInit{
  @Input() questions: FormyInputBase<any>[];
  @Input() questionsJson: string;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  title = 'test-forms';
  testQuestions: FormyInputBase<any>[];
  selectedQuestion: FormyInputBase<any>;
  errors: Map<string, FormyInputBase<any>> = new Map();
  editMode = true;
  showValid = false;
  testValid = true;

  ngOnInit(){
    if (!this.questions && !!this.questionsJson){
      this.questions = JSON.parse(this.questionsJson);
    }else if (!this.questions){
      this.questions = [];
    }
  }

  validateForm(): boolean {
    this.errors.clear();
    this.checkQuestions();
    this.questions.forEach(question => {
      if (!question.key) {
        this.errors.set(`La clave es obligatoria`, question);
        return;
      } if (!question.label) {
        this.errors.set(`${question.key} le falta etiqueta.`, question);
        return;
      }
      if (!question.controlType) {
        this.errors.set(`${question.key} el tipo es obligatorio.`, question);
      }
      if (this.questions.filter(p => p.key === question.key).length > 1) {
        this.errors.set(`Clave ${question.key} duplicada`, question);
      }
      if (!!question.condition) {
        const key = question.condition.split('=')[0];
        const value = question.condition.split('=')[1];
        if (this.questions.filter(p => p.key === key).length != 1) {
          this.errors.set(`Falta el componente ${key}  de la condición "${question.condition}".`, question);
        }
        if (!value) {
          this.errors.set(`Falta un valor a la condición "${question.condition}"`, question);
        }
      }

      if (question.controlType === 'dropdown' && (!question.options || question.options.length === 0)) {
        this.errors.set(`Faltan opciones en el componentente ${question.key}`, question);
      }

      if (!!question.pattern) {
        try {
          let regex = new RegExp(question.pattern);
        } catch (error) {
          this.errors.set(`El patrón de ${question.key} es inválido.`, question);
        }
      }
    });
    this.showValid = this.errors.size === 0;
    return this.errors.size === 0;
  }

  checkQuestions() {
    this.questions.forEach(question => {
      question.value = '';
      switch (question.controlType) {
        case 'checkbox':
          question.required = false;
          question.pattern = '';
          break;
        case 'dropdown':
          question.options.forEach(opt => {
            if (!!opt.value) {
              opt.key = opt.value;
            } else {
              this.removeOption(question, undefined);
            }
          });
          question.pattern = '';

          break;
        case 'multiple':
          question.options.forEach(opt => {
            if (!!opt.value) {
              opt.key = opt.value;
            } else {
              this.removeOption(question, '');
            }
          });
          question.required = false;
          question.pattern = '';
          break;
        case 'separator':
          question.required = false;
          question.pattern = '';
          break;
        case 'text':
          question.required = false;
          question.pattern = '';
          break;
        default:
          break;
      }
    });
  }

  upQuestion(question) {
    this.questions[question.order - 1].order = question.order
    question.order--;
    this.questions.sort((a, b) => a.order < b.order ? -1 : 1);
  }

  downQuestion(question) {
    this.questions[question.order + 1].order = question.order
    question.order++;
    this.questions.sort((a, b) => a.order < b.order ? -1 : 1);
  }


  save() {
    if (this.validateForm()) {
      this.onSave.emit(this.questions);
    }
  }

  select(question) {
    this.questions.forEach(element => {
      element.selected = false;
    });
    question.selected = true;
  }

  test() {
    if (this.validateForm()) {
      this.testQuestions = this.questions.slice(0);
      this.editMode = false;
    }
  }

  changeAnswers(event) {
    this.testValid = !!event;
  }


  addQuestion() {
    const question = new FormyInputBase({ key: `input-${this.questions.length}`, controlType: 'textbox' });
    question.order = this.questions.length;
    this.select(question);
    this.questions.push(question);
    this.questions = this.questions.slice(0);
    setTimeout(function () {
      document.querySelector('#bottom').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }

  goToQuestion(question) {
    this.select(question);
    setTimeout(function () {
      document.querySelector(`#question-${question.order}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }

  removeQuestion(question) {
    if (confirm(`¿Eliminar pregunta ${question.label}?`)) {
      this.questions = this.questions.filter(p => p.key !== question.key);
    }
  }

  addOption(question: FormyInputBase<any>) {
    !question.options ? question.options = [] : '';
    question.options.push({ key: undefined, value: undefined });
  }

  removeOption(question: FormyInputBase<any>, value) {
    question.options = question.options.filter(p => p.value != value);
  }
}
