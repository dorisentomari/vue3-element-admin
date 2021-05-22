import {
  ActionTree, Module, MutationTree,
} from 'vuex';

// eslint-disable-next-line import/no-cycle
import { IRootState } from '../types';

export interface IAppState {
  sidebar: {
    opened: boolean;
  };
}

const TYPES = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
};

const mutations: MutationTree<IAppState> = {
  [TYPES.TOGGLE_SIDEBAR](state) {
    state.sidebar.opened = !state.sidebar.opened;
  },
};

const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    commit(TYPES.TOGGLE_SIDEBAR);
  },
};

const app: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
    },
  },
  mutations,
  actions,
};

export default app;
