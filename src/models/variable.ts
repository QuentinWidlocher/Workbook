export default class Variable {
  private _value!: string;
  public name!: string;

  public get value(): string {
    if (!this._value) {
      this.value = localStorage.getItem(this.name) || "";
    }
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    localStorage.setItem(this.name, value);
  }
}
