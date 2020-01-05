declare module "tiptap" {
  import Vue from "vue";
  export class Editor {
    public constructor({});

    public setOptions({}): void;
    public setContent(content: string): void;
  }

  export class EditorMenuBar extends Vue {}

  export class EditorContent extends Vue {}
}
