import { InjectionKey } from 'vue';
import {
  createStore, Store, useStore as baseUseStore, createLogger,
} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { IRootState } from '@/store/types';
import app from '@/store/modules/app';
import getters from './getters';

export const key: InjectionKey<Store<IRootState>> = Symbol('@@VUEX/STORE');

const isProd = process.env.NODE_ENV === 'production';

const persistedAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app',
  paths: ['app.sidebar.opened'],
});

export default createStore({
  modules: { app },
  getters,
  plugins: isProd ? [persistedAppState] : [createLogger(), persistedAppState],
});

export function useStore() {
  return baseUseStore(key);
}
