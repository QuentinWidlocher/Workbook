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
    localStorage.setItem(this.name, this._value);
  }

  public get numberValue(): number {
    return +this.value;
  }

  public set numberValue(value: number) {
    this._value = value.toString();
    localStorage.setItem(this.name, this._value);
  }

  public get booleanValue(): boolean {
    return (this.value === '1');
  }

  public set booleanValue(value: boolean) {
    this._value = value ? '1' : '0';
    localStorage.setItem(this.name, this._value);
  }

  public get objectValue(): Object {
    return JSON.parse(this.value);
  }

  public set objectValue(value: Object) {
    this._value = JSON.stringify(value);
    localStorage.setItem(this.name, this._value);
  }
}
