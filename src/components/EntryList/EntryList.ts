import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Entry from "@/models/entry";
import { State } from 'vuex-class';

@Component
export default class EntryList extends Vue {
  @Prop({default:[]}) entries!: Entry[];
  @Prop({default:false}) loading!: boolean;
  @State currentEntryIndex!: number;

  private selectEntry(index: number) {
    this.$emit('select', index);
  }
}
