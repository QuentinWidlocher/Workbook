import Vue from "vue";
import Vuex, { MutationTree, StoreOptions } from "vuex";
import { RootState } from './state';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: state,
  getters: {
    currentEntry: (state: any) => {
      return state.entries[state.currentEntryIndex];
    }
  },
  mutations: mutations,
  actions: {},
  modules: {}
}

export default new Vuex.Store<RootState>(store);
