import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Entry from '@/models/entry';
import { State } from 'vuex-class';
import ListItem from '@/models/listItem';

@Component
export default class ItemList extends Vue {
    @Prop({ default: [] }) items!: ListItem[];
    @Prop({ default: false }) loading!: boolean;
    @Prop({ default: 0 }) selected!: number;
    @State currentEntryIndex!: number;

    private selectItem(index: number) {
        this.$emit('select', index);
    }

    public scrollToBottom() {
        const list = this.$refs.list as any;
        list.$el.scrollTop = list.$el.scrollHeight;
    }
}
