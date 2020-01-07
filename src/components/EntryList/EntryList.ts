import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { entriesService as entries, entriesService } from "@/services/entries";
import Entry from "@/models/entry";

@Component
export default class EntryList extends Vue {
  @Prop({default:[]}) entries!: Entry[];

  private selectEntry(index: number) {
    this.$emit('select', index);
  }

  private get currentEntryIndex(): number {
    return entriesService.currentEntryIndex;
  }
}
