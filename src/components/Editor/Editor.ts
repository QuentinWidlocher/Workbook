import { Component, Vue, Prop } from "vue-property-decorator";
import Entry from "@/models/entry";
import { entriesService as entries } from '@/services/entries';

@Component
export default class Editor extends Vue {

  private deleteDialog: boolean = false;

  private deleteEntry() {
    entries.deleteEntry(entries.currentEntry);
    this.deleteDialog = false;
  }

  private get entry(): Entry {
    return entries.currentEntry;
  }
}
