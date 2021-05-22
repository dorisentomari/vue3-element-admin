import { GetterTree } from 'vuex';
import { IRootState } from './types';

// 定义全局 getters
const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
};

export default getters;
