export class FormyInputBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  pattern?: string;
  options: {key: string, value: any}[];
  condition?:string;
  selected?:boolean;
  indexable?:boolean;
  text?:string;
  placeholder?:string;
  multiple?:string;
  min?:number;
  max?:number;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      type?: string,
      pattern?:string,
      condition?:string
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.pattern = options.pattern || '';
    this.condition = options.condition || ''
  }
}
