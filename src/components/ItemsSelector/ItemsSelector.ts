import { Vue, Prop, Component, Watch } from "vue-property-decorator";

@Component
export default class ItemsSelector extends Vue {
    @Prop({ default: []}) items!: string[];
    @Prop({ default: []}) selectedItems!: string[];
    @Prop({ default: false }) deletion!: boolean;
    @Prop({ default: false }) creation!: boolean;
    
    search: string = '';
    newItem: string = '';

    private get allSelected() {
        return this.selectedItems.length === this.items.length;
    }

    private get filteredItems() {
        const search = this.search.toLowerCase();

        if (!search) {
            return this.items;
        }

        return this.items.filter((item: string) => {
            const text = item.toLowerCase();
            return text.indexOf(search) > -1;
        })
    }

    private selectItem(item: string) {
        this.selectedItems.push(item);
    }

    private deleteItem(item: string) {
        const index = this.items.findIndex((value) => item === value);
        if (index >= 0) {
            this.$forceUpdate();
            this.items.splice(index, 1);
        }
    }

    private addItem() {
        const index = this.items.push(this.newItem);
        this.selectedItems.push(this.newItem);
        this.newItem = '';
    }

    @Watch('selectedItems')
    onSelectedChange() {
        this.search = '';
        this.$emit('value:selectedItems', this.selectedItems)
    }
}
