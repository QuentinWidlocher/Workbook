import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Entry from "@/models/entry";
import { entriesService as entries } from "@/services/entries";
import Editor from "./Editor/Editor.vue";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog.vue";

@Component({
  components: {
    Editor, DeleteDialog
  }
})
export default class Edition extends Vue {
  private deleteDialog: boolean = false;

  private deleteEntry() {
    entries.deleteEntry(entries.currentEntry);
    this.deleteDialog = false;
  }

  private get entry(): Entry {
    return entries.currentEntry;
  }
}
