import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { entriesService as entries } from "@/services/entries";
import Entry from "@/models/entry";

@Component
export default class EntryList extends Vue {
  private selectEntry(index: number) {
    if (index === entries.currentEntryIndex) return;

    if (entries.currentEntryIndex < 0) {
      entries.currentEntryIndex = index;
    }

    if (!entries.currentEntry.id) {
      // if the entry has just been added...
      if (!entries.currentEntry.title) {
        // ... and is empty

        // We cancel the creation of the entry
        this.cancelCreation();
      } else {
        // ...and is correct

        // We create the entry
        entries.createEntry(entries.currentEntry);
      }
    } else {
      // If the entry already existed...

      if (!entries.currentEntry.title) {
        // ... and is empty

        // We prevent the user from opening another one
        return;
      } else {
        // ... and is correct

        // We save the current entry
        entries.saveEntry(entries.currentEntry);
      }
    }

    entries.currentEntryIndex = index;
  }

  private cancelCreation() {
    entries.deleteEntry(entries.currentEntry);
  }

  private addEntry() {
    // We prevent the user from adding the entry if he's already creating one
    if (
      entries.currentEntry &&
      !entries.currentEntry.id &&
      !entries.currentEntry.title
    ) {
      return;
    }

    // We add an empty entry
    entries.addEntry({ title: "", description: "" });

    if (entries.currentEntryIndex < 0) entries.currentEntryIndex = 0;

    // We select it
    this.selectEntry(entries.entries.length - 1);
  }

  private get entries(): Entry[] {
    return entries.entries;
  }

  private get currentEntryIndex(): number {
    return entries.currentEntryIndex;
  }
}
