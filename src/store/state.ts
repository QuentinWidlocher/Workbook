import Entry from '@/models/entry';

export interface RootState {
    entries: Entry[];
    originalEntries: Entry[];
    currentEntryIndex: number;
}

const state: RootState = {
    entries: [],
    originalEntries: [],
    currentEntryIndex: -1
}

export default state;