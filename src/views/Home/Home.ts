import { Component, Vue, Watch } from "vue-property-decorator";
import Entry from "@/models/entry";
import Editor from "@/components/Editor/Editor.vue";
import EntryList from "@/components/EntryList/EntryList.vue";
import store from "@/store";
import { entriesService as entries } from "@/services/entries";

@Component({
  components: {
    Editor,
    EntryList
  }
})
export default class Home extends Vue {
  private mounted() {
    entries.initializeEntries();
  }

  private get entries(): Entry[] {
    return store.state.entries;
  }

  private get currentEntry(): Entry {
    return store.getters.currentEntry;
  }
}
