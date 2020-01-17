import { MutationTree } from 'vuex';
import { RootState } from './state';
import Entry from '@/models/entry';

const mutations: MutationTree<RootState> = {
    addEntry(state: RootState, entry: Entry) {
        state.entries.push(entry);
    },
    deleteEntry(state: RootState, entry: Entry) {
        const entryIndex = state.entries.findIndex(
            (entryInList: Entry) => entryInList === entry
        );
        state.entries.splice(entryIndex, 1);
    },
    editEntry(state: RootState, edits: { entry: Entry; edits: any }) {
        const entryIndex = state.entries.findIndex(
            (entryInList: Entry) => entryInList === edits.entry
        );
        if (entryIndex >= 0) {
            Object.assign(state.entries[entryIndex], edits.edits);
        }
    },
    setEntries(state: RootState, entries: Entry[]) {
        state.entries = entries;
    },
    setOriginalEntries(state: RootState, entries: Entry[]) {
        state.originalEntries = entries;
    },
    deleteOriginalEntry(state: RootState, entry: Entry) {
        const entryIndex = state.originalEntries.findIndex(
            (entryInList: Entry) => entryInList === entry
        );
        state.originalEntries.splice(entryIndex, 1);
    },
    mergeOriginalEntries(state: RootState, entries: Entry[]) {
        entries.forEach((entry: Entry) => {
            const index = state.originalEntries.findIndex(c => c.id === entry.id);
            if (index >= 0) {
                state.originalEntries[index] = entry;
            } else {
                state.originalEntries.push(entry);
            }
        });
    },
    deleteEntryByIndex(state: RootState, index: number) {
        state.entries.splice(index, 1);
    },
    changeEntryIndex(state: RootState, index: number) {
        state.currentEntryIndex = index;
    },
    setCategories(state: RootState, categories: string[]) {
        state.categories = categories;
    },
    addCategory(state: RootState, category: string) {
        state.categories.push(category);
    },
    deleteCategory(state: RootState, category: string) {
        const categoryIndex = state.categories.findIndex(
            (categoryInList: string) => categoryInList === category
        );
        state.categories.splice(categoryIndex, 1);
    },
    deleteCategoryByIndex(state: RootState, index: number) {
        state.categories.splice(index, 1);
    },
};

export default mutations;