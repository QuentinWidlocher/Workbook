import { Vue, Prop, Component } from "vue-property-decorator";

export default abstract class Action extends Vue {
  @Prop() commands: any;
  @Prop() isActive: any;
  @Prop() getMarkAttrs!: (attr: string) => any;

  name: string = "";
  icon: string = "";

  active(args?: any): boolean {
    if (!args) {
      return this.isActive[this.name]();
    } else {
      return this.isActive[this.name](args);
    }
  }

  onClick(args?: any): void {
    if (!args) {
      this.commands[this.name]();
    } else {
      return this.commands[this.name](args);
    }
  }

  onHover(args?: any): void {}
}
