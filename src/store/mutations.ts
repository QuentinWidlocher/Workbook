import { MutationTree } from 'vuex';
import { RootState } from './state';
import Entry from '@/models/entry';

const mutations: MutationTree<RootState> = {
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
    setEntries(state: any, entries: Entry[]) {
        state.entries = entries;
    },
    setOriginalEntries(state: any, entries: Entry[]) {
        state.originalEntries = entries;
    },
    deleteEntryByIndex(state: any, index: number) {
        state.entries.splice(index, 1);
    },
    changeEntryIndex(state: any, index: number) {
        state.currentEntryIndex = index;
    }
};

export default mutations;