import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormyComponent } from '../formy.component';
import { FormyInputBase } from '../model/model';
@Component({
  selector: 'lib-formy-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class FormyEditorComponent implements OnInit {
  @Input() questions: FormyInputBase<any>[];
  @Input() questionsJson: string;
  @Input() extended = true;
  @Input() debug = false;
  @Input() disabledTypes: string[] = [];
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() questionsChange: EventEmitter<FormyInputBase<any>[]> = new EventEmitter();
  @ViewChild("formy", { static: false }) formy: FormyComponent;
  title = 'test-forms';
  testQuestions: FormyInputBase<any>[];
  selectedQuestion: FormyInputBase<any>;
  errors: Map<string, FormyInputBase<any>> = new Map();
  editMode = true;
  showValid = false;
  testValid = true;
  regexHelp = false;
  exportJson=false;
  importJson=false;
  copiado=false;
  jsonInvalido=false;
  jsonToImport='';
  types = [
    {
      value: 'dropdown',
      label: 'Opciones'
    },
    {
      value: 'checkbox',
      label: 'Checkbox'
    },
    {
      value: 'textbox',
      label: 'Texto corto'
    },
    {
      value: 'textboxarea',
      label: 'Texto largo'
    }, {
      value: 'number',
      label: 'Número'
    },
    {
      value: 'date',
      label: 'Fecha'
    },
    {
      value: 'time',
      label: 'Hora'
    },
    {
      value: 'scale',
      label: 'Escala'
    },
    {
      value: 'multiple',
      label: 'Selección múltiple'
    },
    {
      value: 'separator',
      label: 'Separador'
    },
    {
      value: 'text',
      label: 'Instrucciones'
    },
    {
      value: 'rut',
      label: 'Rut'
    },
    {
      value: 'email',
      label: 'Email'
    },
    {
      value: 'image',
      label: 'Imágen externa'
    }
  ]
  ngOnInit() {
    if (!this.questions && !!this.questionsJson) {
      this.questions = JSON.parse(this.questionsJson);
    } else if (!this.questions) {
      this.questions = [];
    }
    this.disabledTypes.forEach(p=>{
      this.types = this.types.filter(type=>type.value !== p);
    });
    /*     setInterval(() => {
          this.questionsChange.emit(this.questions);
        }, 1000) */
  }

  validateForm(): boolean {
    return this.validateQuestions(this.questions);
  }

  validateQuestions(questions:FormyInputBase<any>[]): boolean {
    this.errors.clear();
    this.checkQuestions(questions);
    questions.forEach(question => {
      if (!question.key) {
        question.error = true;
        this.errors.set(`La clave es obligatoria`, question);
        return;
      } if (!question.label) {
        question.error = true;
        this.errors.set(`${question.key} le falta etiqueta.`, question);
        return;
      }
      if (!question.controlType) {
        question.error = true;
        this.errors.set(`${question.key} el tipo es obligatorio.`, question);
      }
      if (this.questions.filter(p => p.key === question.key).length > 1) {
        question.error = true;
        this.errors.set(`Clave ${question.key} duplicada`, question);
      }
      if (!!question.condition) {
        let igualdad='=';
        if (question.condition.includes('<='))
          igualdad = '<='
        if (question.condition.includes('>='))
          igualdad = '>='
        const key = question.condition.split(igualdad)[0];
        const value = question.condition.split(igualdad)[1];
        if (this.questions.filter(p => p.key === key).length != 1) {
          question.error = true;
          this.errors.set(`Falta el componente ${key}  de la condición "${question.condition}".`, question);
        }
        if (!value) {
          question.error = true;
          this.errors.set(`Falta un valor a la condición "${question.condition}"`, question);
        }
      }

      if (question.controlType === 'dropdown' && (!question.options || question.options.length === 0)) {
        question.error = true;
        this.errors.set(`Faltan opciones en el componentente ${question.key}`, question);
      }

      if (!!question.pattern) {
        try {
          let regex = new RegExp(question.pattern);
        } catch (error) {
          question.error = true;
          this.errors.set(`El patrón de ${question.key} es inválido.`, question);
        }
      }
    });
    this.showValid = this.errors.size === 0;
    return this.errors.size === 0;
  }

  clearValues() {
    this.questions.forEach(p => {
      p.value = undefined;
      if (!!p.options) {
        p.options.forEach(opt => {
          if (!!opt.key) {
            opt.value = false;
          }
        });
      }
    });
  }

  checkQuestions(questions) {
    questions.forEach(question => {
      question.value = '';
      switch (question.controlType) {
        case 'checkbox':
          question.pattern = '';
          question.min = undefined;
          question.max = undefined;
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
          question.min = undefined;
          question.max = undefined;
          break;
        case 'multiple':
          question.options.forEach(opt => {
            if (!!opt.key) {
              opt.value = false;
            } else {
              this.removeOption(question, '');
            }
          });

          question.pattern = '';
          question.min = undefined;
          question.max = undefined;
          break;
        case 'separator':
          question.required = false;
          question.pattern = '';
          break;
        case 'text':
          question.required = false;
          question.pattern = '';
          break;
        case 'textbox':
          question.min = undefined;
          question.max = undefined;
          break;
        case 'textboxarea':
          question.min = undefined;
          question.max = undefined;
          break;
        case 'rut':
          question.pattern = '';
          question.min = undefined;
          question.max = undefined;
          question.placeholder = 'Sin puntos y con guión'
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
    question.error = false;
    this.regexHelp = false;
  }

  test() {
    if (this.validateForm()) {
      this.testQuestions = this.questions.slice(0);
      this.editMode = false;
    }
  }

  validar() {
    this.testValid = this.formy.checkForm();
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

  removeOption(question: FormyInputBase<any>, key) {
    question.options = question.options.filter(p => p.key != key);
  }


  importar(){
    let questions;
    try{
    questions = JSON.parse(this.jsonToImport);
    }catch(error){
      this.jsonInvalido=true;
      return;
    }
    this.jsonInvalido=false;
    if (this.validateQuestions(questions)) {
      this.questions = questions;
      this.editMode = true;
      this.importJson = false;
    }
  }

  copyJson(){
    navigator.clipboard.writeText(JSON.stringify(this.questions)).catch(() => {
      console.error("Unable to copy text");
    });
    this.copiado=true;
  }
  asJson() {
    return JSON.stringify(this.questions);
  }
}
