import { Component, Vue, Watch } from "vue-property-decorator";
import Entry from "@/models/entry";
import Edition from "@/components/Edition/Edition.vue";
import EntryList from "@/components/EntryList/EntryList.vue";
import store from "@/store";
import { entriesService as entries } from "@/services/entries";
import { globalVariables } from '@/services/globalVariables';

@Component({
  components: {
    Edition,
    EntryList
  }
})
export default class Home extends Vue {
  private mounted() {
    entries.initializeEntries();
    this.initializeAutosaving();
  }

  private initializeAutosaving() {
    window.addEventListener('beforeunload', (e: Event) => {
      entries.saveCurrentEntry();
    })

    setInterval(() => {
      entries.saveCurrentEntry();
    }, globalVariables.autosaveInterval.numberValue);
  }

  private get entries(): Entry[] {
    return store.state.entries;
  }

  private get currentEntry(): Entry {
    return store.getters.currentEntry;
  }
}
