export default class Variable {
  private _value!: string;
  public name: string;
  public default: string;

  constructor(name: string, defaultValue: string = '') {
    this.name = name;
    this.default = defaultValue;
  }

  public get value(): string {
    if (!this._value) {
      this.value = localStorage.getItem(this.name) || this.default;
    }
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    localStorage.setItem(this.name, value);
  }

  public get numberValue(): number {
    return +this.value;
  }

  public get booleanValue(): boolean {
    return (this.value === 'true');
  }

  public get objectValue(): Object {
    return JSON.parse(this.value);
  }
}
