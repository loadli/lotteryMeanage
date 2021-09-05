/*
 * @Author: xiaorui
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 21:42:23
 * @Description: cookie相关操作
 * @FilePath: /lotteryMeanage/client/react/src/pages/DeliveryRecord/model.ts
 */
import type { Effect, Reducer, Subscription } from 'umi';
import { getDeliveryRecordList, changeTransportStatus } from './services';

export interface RecordModelState {}

export interface RecordList {
  id: string;
  user: string;
  spending: string;
  remaining: string;
  description: string;
  createdAt: string;
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
  state: {},
  reducers: {},
  effects: {
    *getList(action, { call, put }) {
      const res = yield call(getDeliveryRecordList, { ...action?.payload });
      return res;
    },
    *changeTransportStatus(action, { call, put }) {
      const res = yield call(changeTransportStatus, { ...action?.payload });
      action?.callback();
      return res;
    },
  },
};

export default Model;
