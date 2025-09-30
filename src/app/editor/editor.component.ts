import { Component, OnInit } from '@angular/core';
import { FormyInputBase } from 'projects/formy/src/public_api';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  result: FormyInputBase<any>;
  extended = false;
  jsonTest = '[{"type":"","controlType":"scale","key":"10","label":"Escala","order":0,"required":true,"value":"","placeholder":"Esto es una ayuda.","min":1,"max":5,"selected":false},{"type":"text","controlType":"textbox","key":"1","label":"Texto corto","order":1,"required":true,"value":"","placeholder":"Esto es una ayuda.","pattern":"[a-zA-Z]","selected":true,"indexable":true},{"type":"","controlType":"dropdown","key":"2","label":"Opciones","options":[{"key":"Valor 1","value":"Valor 1"},{"key":"Valor 2","value":"Valor 2"}],"order":2,"required":true,"value":"","selected":false,"pattern":""},{"type":"","controlType":"checkbox","key":"3","label":"Checkbox","order":3,"required":false,"value":"","selected":false,"pattern":""},{"type":"","controlType":"textboxarea","key":"4","label":"Textboxarea","order":4,"required":true,"value":"","selected":false},{"type":"","controlType":"text","key":"9","label":"Instrucciones","order":5,"required":false,"value":"","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor erat leo, sed convallis urna venenatis quis. Fusce et cursus massa. Pellentesque vehicula, nulla vel fermentum ultricies, dui libero. ","selected":false,"pattern":""},{"type":"","controlType":"number","key":"5","label":"Numero","order":6,"required":true,"value":"","selected":false},{"type":"","controlType":"date","key":"6","label":"Fecha","order":7,"required":true,"value":"","selected":false},{"type":"","controlType":"time","key":"7","label":"Time","order":8,"required":true,"value":"","selected":false},{"type":"","controlType":"separator","key":"8","label":"Separador","order":9,"required":false,"value":"","selected":false,"pattern":""}]';
  questions: FormyInputBase<any>[] = [{
    type: '',
    controlType: 'checkbox',
    key: 'input1',
    label: 'Checkbox',
    options: undefined,
    order: 0,
    required: true,
    value: ''
  },{
    type: '',
    controlType: 'multiple',
    key: 'multiple',
    label: 'Opciones',
    options: [{key:'Multi 1',value:true},{key:'Multi 2',value:true}],
    order: 1,
    required: true,
    value: '',
    condition:'input1==true'
  },
   {
      type: 'text',
      controlType: 'textbox',
      key: 'input2',
      label: 'Texto corto',
      options: undefined,
      order: 0,
      required: true,
      value: '',
      placeholder: 'Esto es una ayuda.',
      pattern: '[a-zA-Z]'
    }
    /*  {
      type: '',
      controlType: 'scale',
      key: '10',
      label: 'Escala',
      options: undefined,
      order: 1,
      required: true,
      value: '',
      placeholder: 'Esto es una ayuda.',
      min:1,
      max:5
    },
    {
      type: '',
      controlType: 'dropdown',
      key: '2',
      label: 'Opciones',
      options: [{key:'Valor 1',value:'Valor 1'},{key:'Valor 2',value:'Valor 2'}],
      order: 2,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'checkbox',
      key: '3',
      label: 'Checkbox',
      options: undefined,
      order: 3,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'textboxarea',
      key: '4',
      label: 'Textboxarea',
      options: undefined,
      order: 4,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'number',
      key: '5',
      label: 'Numero',
      options: undefined,
      order: 5,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'date',
      key: '6',
      label: 'Fecha',
      options: undefined,
      order: 6,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'time',
      key: '7',
      label: 'Time',
      options: undefined,
      order: 7,
      required: true,
      value: ''
    },{
      type: '',
      controlType: 'separator',
      key: '8',
      label: 'Separador',
      options: undefined,
      order: 8,
      required: false,
      value: ''
    },{
      type: '',
      controlType: 'text',
      key: '9',
      label: 'Instrucciones',
      options: undefined,
      order: 9,
      required: false,
      value: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor erat leo, sed convallis urna venenatis quis. Fusce et cursus massa. Pellentesque vehicula, nulla vel fermentum ultricies, dui libero. '
    },{
      type: '',
      controlType: 'multiple',
      key: 'multiple',
      label: 'Opciones',
      options: [{key:'Multi 1',value:'Multi 1'},{key:'Multi 2',value:'Multi 2'}],
      order: 10,
      required: false,
      value: ''
    }, */
  ]

  save(event){
    this.result = event;
  }

  asJson(){
    return JSON.stringify(this.questions);
  }

}
