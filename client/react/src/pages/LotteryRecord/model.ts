import type { Effect, Reducer, Subscription } from 'umi';
import {
  getRecordList
} from '../../services/record';

export interface RecordModelState {
  list: any;
}

export interface RecordList {
  id: string,
  user: string,
  spending: string,
  remaining: string,
  description: string,
  createdAt: string,
}

export interface RecordModelType {
  namespace: 'lotteryRecord';
  state: RecordModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<RecordModelState>>;
  subscriptions?: { setup: Subscription };
}

const Model: RecordModelType = {
  namespace: 'lotteryRecord',
  state: {
    list: '',
  },
  reducers: {

  },
  effects: {
    *getList(action , { call, put }) {
      const res = yield call(getRecordList, {...action?.payload});
      return res;
    }
  },
};

export default Model;
