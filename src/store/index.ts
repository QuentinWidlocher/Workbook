import Vue from "vue";
import Vuex, { MutationTree, StoreOptions } from "vuex";
import { RootState } from './state';
import state from './state';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: {},
  modules: {}
}

export default new Vuex.Store<RootState>(store);
