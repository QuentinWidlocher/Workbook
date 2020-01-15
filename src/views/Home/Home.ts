import { Component, Vue, Watch } from "vue-property-decorator";
import Entry from "@/models/entry";
import Edition from "@/components/Edition/Edition.vue";
import EntryList from "@/components/EntryList/EntryList.vue";
import { entriesService as entries, entriesService } from "@/services/entries";
import { globalVariables } from '@/services/globalVariables';
import _ from "lodash";
import { savingSpinner } from '@/services/savingSpinner';
import { State, Getter } from 'vuex-class';
import { State2Way } from 'vuex-class-state2way';
import Search from "@/components/Search/Search.vue";
import SearchCriterias from '@/models/searchCriterias';
import { loadingSpinner } from '@/services/loadingSpinner';

@Component({
  components: {
    Edition,
    EntryList,
    Search
  }
})
export default class Home extends Vue {

  public originalCurrentEntry!: Entry; // to compare changes

  @State2Way('changeEntryIndex', 'currentEntryIndex') currentEntryIndex!: number;
  @State2Way('setEntries', 'entries') entries!: Entry[];
  @State originalEntries!: Entry[];
  @Getter currentEntry!: Entry;

  listLoading: boolean = true;

  criterias: SearchCriterias = new SearchCriterias();
  searchOpened: boolean = false;

  private mounted() {
    console.log('Home mounted');
    loadingSpinner.startSpinning();
    this.listLoading = true;
    entries.initializeEntries().finally(() => {
      this.entries = this.criterias.doSort(this.entries);
      loadingSpinner.stopSpinning();
      this.listLoading = false;
    });
    this.initializeAutosaving();
  }

  private addEntry() {
    // We prevent the user from adding the entry if he's already creating one
    if ( this.currentEntry && !this.currentEntry.id && !this.currentEntry.title) {
      return;
    }

    // We add an empty entry
    entries.addEntry({ title: "", description: "" });

    if (this.currentEntryIndex < 0) this.currentEntryIndex = 0;

    // We select it
    this.selectEntry(this.entries.length - 1);
  }

  private selectEntry(index: number) {
    if (this.searchOpened) {
      this.selectEntrySearch(index);
    } else {
      this.selectEntryEdition(index);
    }
  }

  private selectEntrySearch(index: number) {
    this.searchOpened = false;
    this.currentEntryIndex = index;
  }

  private openSearch() {
    this.currentEntryIndex = -1;
    this.searchOpened = true;
  }

  private selectEntryEdition(index: number) {
    if (index === this.currentEntryIndex) return;

    if (this.currentEntryIndex < 0) {
      this.currentEntryIndex = index;
    }

    if (!this.currentEntry.id) {
      // if the entry has just been added...
      if (!this.currentEntry.title) {
        // ... and is empty

        // We cancel the creation of the entry
        this.cancelCreation();
      } else {
        // ...and is correct

        // We create the entry
        entries.createEntry(this.currentEntry);
      }
    } else {
      // If the entry already existed...

      if (!this.currentEntry.title) {
        // ... and is empty

        // We prevent the user from opening another one
        return;
      } else {
        // ... and is correct

        // We save the current entry
        entries.saveCurrentEntry(this.originalCurrentEntry).catch(() => { });
      }
    }

    this.currentEntryIndex = index;
    this.originalCurrentEntry = Object.assign({}, this.currentEntry);
  }

  private cancelCreation() {
    entries.deleteEntry(this.currentEntry);
  }

  private initializeAutosaving() {
    window.addEventListener('beforeunload', (e: Event) => {
      entries.saveCurrentEntry(this.originalCurrentEntry).catch(() => {});
    })

    setInterval(() => {
        if (globalVariables.autosave.booleanValue) {
          entries.saveCurrentEntry(this.originalCurrentEntry).then(() => {
            // The new original entry is the now edited current entry 
            this.originalCurrentEntry = Object.assign({}, this.currentEntry);
          }).catch(() => { });
        }
    }, globalVariables.autosaveInterval.numberValue);
  }

  @Watch('currentEntry.description')
  @Watch('currentEntry.title')
  private onCurrentEntryChange() {
    if (this.currentEntry && !_.isEqual(Object.assign({}, this.currentEntry), this.originalCurrentEntry)) {
      savingSpinner.pending = true;
    }
  }

  private search(criterias: SearchCriterias) {
    this.entries = criterias.filter(this.originalEntries);
    this.entries = criterias.doSort(this.entries);
  }

}
