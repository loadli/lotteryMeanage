import type { Effect, Reducer, Subscription } from 'umi';
import {
  getPrizeList,
  transAble
} from '../../services/prize';

export interface PrizeModelState {
  list: any;
}

export interface PrizeList {
  id: string,
  user: string,
  spending: string,
  remaining: string,
  description: string,
  createdAt: string,
}

export interface PrizeModelType {
  namespace: 'prize';
  state:PrizeModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<PrizeModelState>>;
  subscriptions?: { setup: Subscription };
}

const Model: PrizeModelType = {
  namespace: 'prize',
  state: {
    list: '',
  },
  reducers: {
    // updateList(state: PrizeModelState, { type, payload }) {
    //     state.list = [...payload.list]
    //     return state
    // }
  },
  effects: {
    *getList(action , { call, put }) {
      const res = yield call(getPrizeList, {...action?.payload});
      return res;
    },
    *transAble(action, { call, put }) {
      const res = yield call(transAble, {...action?.payload});
      // const list = yield call(getPrizeList, {...action?.payload})
      // yield put({ type: 'prize/updateList', { list: list } });
      return res;
    }
  },
};

export default Model;
