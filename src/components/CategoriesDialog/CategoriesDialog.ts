import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import ItemsSelector from "@/components/ItemsSelector/ItemsSelector.vue";

@Component({
    components: {
        ItemsSelector
    }
})
export default class CategoriesDialog extends Vue {
    @Prop({ default: false }) value!: boolean;
    @Prop({ default: []}) items!: string[];
    @Prop({ default: []}) selectedItems!: string[];
    
    value_: boolean = this.value;
    selections: number[] = [];

    onConfirm() {
        this.$emit('confirm', this.selections);
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
