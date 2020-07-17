import { FormyInputBase } from '../model/model';

export class Textbox extends FormyInputBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
