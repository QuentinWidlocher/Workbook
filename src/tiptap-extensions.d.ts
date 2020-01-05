declare module "tiptap-extensions" {
  import Vue from "vue";

  export class Blockquote {}
  export class CodeBlock {}
  export class HardBreak {}
  export class Heading { constructor(options?: { levels?: number[] });}
  export class OrderedList {}
  export class BulletList {}
  export class ListItem {}
  export class TodoItem {}
  export class TodoList { constructor(options?: { nested?: boolean }) }
  export class Bold {}
  export class Code {}
  export class Italic {}
  export class Link {}
  export class Strike {}
  export class Underline {}
  export class History {}
  export class HorizontalRule { }
  export class Image { }
  export class Table { constructor(options?: { resizable?: boolean }) }
  export class TableHeader { }
  export class TableCell { }
  export class TableRow { }
}
