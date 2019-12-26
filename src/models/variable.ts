export default class Variable {
  private _value!: string;
  public name!: string;

  public get value(): string {
    if (!this._value) {
      const localValue = localStorage.getItem(this.name);
      this.value = localValue ? localValue : "";
    }
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    localStorage.setItem(this.name, value);
  }
}
