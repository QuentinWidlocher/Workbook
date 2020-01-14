import Entry from "@/models/entry";
import { firebaseService } from "./firebase";
import EntryMapper from "@/mappers/EntryMapper";
import store from "@/store";
import { globalVariables } from "./globalVariables";
import { savingSpinner } from "@/services/savingSpinner";
import { loadingSpinner } from "@/services/loadingSpinner";
import _ from 'lodash';

export class EntriesService {
  public initializeEntries(): Promise<Entry[]> {
    this.entries = [];
    return firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .get()
      .then(snapshot => {
        const entries: Entry[] = [];

        snapshot.forEach(doc => {
          const entry: Entry = EntryMapper.toEntry(doc);
          entries.push(entry);
          store.commit("addEntry", entry);
        });

        store.commit('setOriginalEntries', entries);
        return entries;
      });
  }

  public createEntry(entry: Entry): Promise<Entry> {
    if (!entry) return Promise.reject();
    return firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .add(EntryMapper.toDocument(entry))
      .then(doc => {
        store.commit("editEntry", { entry: entry, edits: { id: doc.id } });
        return Object.assign(entry, { id: doc.id });
      });
  }

  // If originalEntry is passed, saving only occurs when objects are different
  public saveEntry(entry: Entry, originalEntry?: Entry, create: boolean = false): Promise<Entry> {
    if (!entry) return Promise.reject({ fatal: true, text: 'Entry is empty' });
    if (!globalVariables.userId.value) return Promise.reject({ fatal: true, text: 'User id is not specified'});
    if (!entry.title) return Promise.reject({ fatal: true, text: 'Entry title is empty'});

    if (!entry.id) {
      if (create) {
        return this.createEntry(entry);
      } else {
        return Promise.reject({ fatal: false, text: 'Entry is not yet created, it cannot be saved' });
      }
    }

    if (originalEntry && _.isEqual(Object.assign({}, this.currentEntry), originalEntry)) {
      return Promise.reject({ fatal: false, text: 'Objects are identical, no need to save'});
    }

    savingSpinner.startSpinning();
    return firebaseService.db
      .collection("users")
      .doc(globalVariables.userId.value)
      .collection("entries")
      .doc(entry.id)
      .set(EntryMapper.toDocument(entry))
      .then(() => { 
        savingSpinner.stopSpinning();
        savingSpinner.pending = false;
        return entry;
      }).catch((e) => {
        savingSpinner.stopSpinning();
        return e;
      });
  }

  public saveCurrentEntry(originalEntry?: Entry, create: boolean = false): Promise<Entry> {
    return this.saveEntry(this.currentEntry, originalEntry, create);
  }

  public addEntry(entry: Entry): Promise<Entry> {
    if (!entry) return Promise.reject();
    store.commit("addEntry", entry);
    return Promise.resolve(entry);
  }

  public deleteEntry(entry: Entry): Promise<Entry> {
    if (!entry) return Promise.resolve(entry);
    if (!entry.id) {
      store.commit("deleteEntry", entry);
      this.currentEntryIndex = -1;
      return Promise.resolve(entry);
    } else {
      return firebaseService.db
        .collection("users")
        .doc(globalVariables.userId.value)
        .collection("entries")
        .doc(entry.id)
        .delete()
        .then(() => {
          store.commit("deleteEntry", entry);
          this.currentEntryIndex = -1;
          return entry;
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

  public set entries(entries: Entry[]) {
    store.commit("setEntries", entries)
  }

  public set currentEntryIndex(value: number) {
    store.commit("changeEntryIndex", value);
  }
}

export const entriesService: EntriesService = new EntriesService();
