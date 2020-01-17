import { GetterTree } from 'vuex';
import { RootState } from './state';
import Entry from '@/models/entry';

const getters: GetterTree<RootState, RootState> = {
    currentEntry: (state: RootState): Entry | undefined => {
        if (state.currentEntryIndex >= 0) {
            return state.entries[state.currentEntryIndex];
        } else {
            return undefined;
        }
    }
};

export default getters;