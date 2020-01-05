import Vue from "vue";
import Vuex, { Mutation } from "vuex";
import Entry from "@/models/entry";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entries: Array<Entry>(),
    currentEntryIndex: 0
  },
  getters: {
    currentEntry: (state: any) => {
      return state.entries[state.currentEntryIndex];
    }
  },
  mutations: {
    addEntry(state: any, entry: Entry) {
      state.entries.push(entry);
    },
    deleteEntry(state: any, entry: Entry) {
      const entryIndex = state.entries.findIndex(
        (entryInList: Entry) => entryInList === entry
      );
      state.entries.splice(entryIndex, 1);
    },
    editEntry(state: any, edits: { entry: Entry; edits: any }) {
      const entryIndex = state.entries.findIndex(
        (entryInList: Entry) => entryInList === edits.entry
      );
      if (entryIndex >= 0) {
        Object.assign(state.entries[entryIndex], edits.edits);
      }
    },
    deleteEntryByIndex(state: any, index: number) {
      state.entries.splice(index, 1);
    },
    changeEntryIndex(state: any, index: number) {
      state.currentEntryIndex = index;
    }
  },
  actions: {},
  modules: {}
});
