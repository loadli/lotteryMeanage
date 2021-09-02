import type { Effect, Reducer, Subscription } from 'umi';
import {
    getDeliveryRecordList,
    changeTransportStatus
} from './services';

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
  namespace: 'deliveryRecord';
  state: RecordModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<RecordModelState>>;
  subscriptions?: { setup: Subscription };
}

const Model: RecordModelType = {
  namespace: 'deliveryRecord',
  state: {
    list: [],
  },
  reducers: {
    saveList(state, { payload }) {
        return {
          ...state,
          list: payload,
        };
      },
  },
  effects: {
    *getList(action , { call, put }) {
      const res = yield call(getDeliveryRecordList, {...action?.payload});
      if(res.code === '200'){
           yield put({
        type: "saveList",
        payload: res.data,
      });
      action?.callback(res)
      }
      return res;
    },
    *changeTransportStatus(action , { call, put }) {
        const res = yield call(changeTransportStatus, {...action?.payload});
        action?.callback()
        return res;
      },
  },
};

export default Model;
