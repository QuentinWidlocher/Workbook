import { Vue, Prop, Component, Watch } from "vue-property-decorator";

@Component
export default class DeleteDialog extends Vue {
    @Prop({ default: false }) value!: boolean;
    @Prop({ default: "mdi-alert-circle" }) titleIcon!: string;
    @Prop({ default: "" }) title!: string;
    @Prop({ default: "" }) content!: string;
    @Prop({ default: "" }) deleteButtonLabel!: string;
    @Prop({ default: "" }) cancelButtonLabel!: string;

    value_: boolean = this.value;

    onDeleteConfirm() {
        this.$emit('confirm');
        this.value_ = false;
    }

    onCancel() {
        this.value_ = false;
    }

    @Watch('value_')
    onLocalValueChange() {
        this.$emit('input', this.value_);
    }

    @Watch('value')
    onValueChange() {
        this.value_ = this.value;
    }
}
