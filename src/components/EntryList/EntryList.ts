import { Component, Vue, Prop } from "vue-property-decorator";
import Entry from '@/models/entry';

@Component
export default class EntryList extends Vue {
    @Prop() entries!: Entry[];
    public currentEntryIndex!: number;

    public selectEntry(index: number) {
        this.currentEntryIndex = index;
        this.$emit('update:currentEntryIndex', index);
    }
}