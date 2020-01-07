import Entry from "@/models/entry";
import { firebaseService } from "./firebase";
import EntryMapper from "@/mappers/EntryMapper";
import store from "@/store";
import { globalVariables } from "./globalVariables";
import { savingSpinner } from "@/services/savingSpinner";

export class EntriesService {
  public initializeEntries() {
    firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          store.commit("addEntry", EntryMapper.toEntry(doc));
        });
      });
  }

  public createEntry(entry: Entry) {
    if (!entry) return;
    firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .add(EntryMapper.toDocument(entry))
      .then(doc => {
        store.commit("editEntry", { entry: entry, edits: { id: doc.id } });
      });
  }

  public saveEntry(entry: Entry) {
    if (!entry) return;
    savingSpinner.startSpinning();
    firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .doc(entry.id)
      .set(EntryMapper.toDocument(entry))
      .then(() => { savingSpinner.stopSpinning() });
  }

  public saveCurrentEntry() {
    this.saveEntry(this.currentEntry);
  }

  public addEntry(entry: Entry) {
    if (!entry) return;
    store.commit("addEntry", entry);
  }

  public deleteEntry(entry: Entry) {
    if (!entry) return;
    if (!entry.id) {
      store.commit("deleteEntry", entry);
      this.currentEntryIndex = -1;
    } else {
      firebaseService.db
        .collection("users")
        .doc(globalVariables.userId.value)
        .collection("entries")
        .doc(entry.id)
        .delete()
        .then(() => {
          store.commit("deleteEntry", entry);
          this.currentEntryIndex = -1;
        });
    }
  }

  public get currentEntry(): Entry {
    return store.getters.currentEntry;
  }

  public get entries(): Entry[] {
    return store.state.entries;
  }

  public get currentEntryIndex(): number {
    return store.state.currentEntryIndex;
  }

  public set currentEntryIndex(value: number) {
    store.commit("changeEntryIndex", value);
  }
}

export const entriesService: EntriesService = new EntriesService();
