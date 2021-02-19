import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormyInputBase } from '../model/model';

interface SumaryQuestion {
  key: string,
  label: string,
  order:number,
  controlType: string,
  answers: Map<string, number>
}
@Component({
  selector: 'lib-formy-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class FormySumaryComponent implements OnInit, OnChanges {


  @Input() answers: any[];
  sumary: Map<String, SumaryQuestion[]> = new Map();
  constructor() { }

  ngOnInit() {
    this.generateSumary();
  }

  ngOnChanges() {
    this.generateSumary();
  }

  getPercentage(value) {
    return Math.floor(value * 100 / this.answers.length);
  }
  getAverage(value) {
    return Math.floor(value / this.answers.length);
  }



  generateSumary() {
    this.sumary = new Map();
    this.answers.forEach(answer => {
      let form = answer as FormyInputBase<any>[];
      form.forEach(question => {
        let sumaryQuestion;
        let key = question.order +' - '+question.key;
        if (!this.sumary.has(key)) {
          sumaryQuestion = {
            key: question.key,
            label: question.label,
            order:question.order,
            controlType: question.controlType,
            answers: this.getQuestionSumaryMap(question)
          }
          this.sumary.set(key, sumaryQuestion);
        } else {
          sumaryQuestion = this.sumary.get(key);
        }
        this.setAnswerCount(question, sumaryQuestion);
      });
    });
  }

  setAnswerCount(answer: FormyInputBase<any>, sumaryQuestion: SumaryQuestion) {
    switch (answer.controlType) {
      case 'dropdown':
        this.increaseOneMapKeyValue(sumaryQuestion.answers, answer.value);
        break;
      case 'scale':
        this.increaseOneMapKeyValue(sumaryQuestion.answers, answer.value);
        break;
      case 'checkbox':
        if (answer.value == true)
          this.increaseOneMapKeyValue(sumaryQuestion.answers,'sum');
        break;
      case 'number':
        sumaryQuestion.answers.set('sum', sumaryQuestion.answers.get('sum') + Number.parseInt(answer.value));
        break;
      case 'multiple':
        answer.options.forEach(opt => {
          if (opt.value) {
            this.increaseOneMapKeyValue(sumaryQuestion.answers, opt.key);
          }
        }); ``
        break;
      default:
        sumaryQuestion.answers.set(answer.value, null);
        break;
    }
  }

  getQuestionSumaryMap(question: FormyInputBase<any>): Map<string, number> {
    let ret = new Map();
    switch (question.controlType) {
      case 'dropdown':
        question.options.forEach(opt => {
          ret.set(opt.key, 0);
        });
        break;
      case 'number':
        ret.set('sum', 0);
        break;
      case 'checkbox':
          ret.set('sum', 0);
          break;
      case 'multiple':
        question.options.forEach(opt => {
          ret.set(opt.key, 0);
        });
        break;
      case 'scale':
        let i = question.min;
        while (i <= question.max) {
          ret.set(`${i}`, 0);
          i++;
        }
        break;
      default:
        ret.set(question.value, null);
    }

    return ret;
  }

  increaseOneMapKeyValue(map: Map<string, number>, key: string) {
    map.set(key, map.get(key) + 1);
  }
}
