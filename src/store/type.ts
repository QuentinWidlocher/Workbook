import Entry from '@/models/entry';

export interface RootState {
    entries: Entry[];
    currentEntryIndex: number;
}