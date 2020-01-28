import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Editor as TipTapEditor, EditorContent, EditorMenuBar } from 'tiptap';
import {
    Bold,
    Italic,
    Underline,
    Code,
    Blockquote,
    CodeBlock,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    HorizontalRule,
    Link,
    Strike,
    History,
    HardBreak,
    Image,
    Table,
    TableHeader,
    TableCell,
    TableRow,
} from 'tiptap-extensions';
import {
    BoldAction,
    ItalicAction,
    UnderlineAction,
    SpacerAction,
    HeadingsAction,
    LinkAction,
    CodeAction,
    StrikeAction,
    QuoteAction,
    RuleAction,
    BulletListAction,
    OrderedListAction,
    TodoListAction,
    ImageAction,
    TableAction,
} from './Actions';

@Component({
    components: {
        EditorContent,
        EditorMenuBar,
        BoldAction,
        ItalicAction,
        UnderlineAction,
        SpacerAction,
        HeadingsAction,
        LinkAction,
        CodeAction,
        StrikeAction,
        QuoteAction,
        RuleAction,
        BulletListAction,
        OrderedListAction,
        TodoListAction,
        ImageAction,
        TableAction,
    },
})
export default class Editor extends Vue {
    @Prop({ default: '' }) value!: string;

    private topRowButtons = [
        'Bold',
        'Italic',
        'Underline',
        'Spacer',
        'Headings',
        'Spacer',
        'Link',
        'Image',
        'Spacer',
        'BulletList',
        'OrderedList',
        'TodoList',
        'Spacer',
        'Table',
    ];
    private bottomRowButtons = ['Code', 'Strike', 'Quote', 'Spacer', 'Rule'];

    private extendedToolbar: boolean = false;

    private editor: TipTapEditor = new TipTapEditor({
        content: this.value,
        extensions: [
            new Bold(),
            new Italic(),
            new Underline(),
            new Code(),
            new Blockquote(),
            new CodeBlock(),
            new Heading({ levels: [1, 2, 3] }),
            new OrderedList(),
            new BulletList(),
            new ListItem(),
            new TodoItem({ nested: true }),
            new TodoList(),
            new Link(),
            new Strike(),
            new History(),
            new HorizontalRule(),
            new HardBreak(),
            new Image(),
            new Table({ resizable: true }),
            new TableHeader(),
            new TableCell(),
            new TableRow(),
        ],
        onUpdate: (info: any) => {
            this.onUpdate(info);
        },
    });

    private emitAfterOnUpdate: boolean = false;

    private onUpdate(info: any) {
        this.emitAfterOnUpdate = true;
        this.$emit('input', info.getHTML());
    }

    @Watch('value')
    private onDescriptionChanged() {
        if (this.emitAfterOnUpdate) {
            this.emitAfterOnUpdate = false;
            return;
        }
        this.editor.setContent(this.value);
    }
}
