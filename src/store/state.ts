import Entry from '@/models/entry';

export interface RootState {
    entries: Entry[];
    originalEntries: Entry[];
    currentEntryIndex: number;
    categories: string[];
}

const state: RootState = {
    entries: [],
    originalEntries: [],
    currentEntryIndex: -1,
    categories: []
}

export default state;