import type { Effect, Reducer, Subscription } from 'umi';
import {
  getPrizeList
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

  },
  effects: {
    *getList(action , { call, put }) {
      const res = yield call(getPrizeList, {...action?.payload});
      return res;
    }
  },
};

export default Model;
