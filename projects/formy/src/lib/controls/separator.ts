import { FormyInputBase } from '../model/model';

export class Separator extends FormyInputBase<string> {
  controlType = 'separator';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
