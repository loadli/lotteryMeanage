/*
 * @Author: xiaorui
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 20:52:14
 * @Description: cookie相关操作
 * @FilePath: /lotteryMeanage/client/react/src/pages/LotteryRecord/model.ts
 */
import type { Effect, Reducer, Subscription } from 'umi';
import { deleteRecord, getRecordList } from '../../services/record';

export interface RecordModelState {}

export interface RecordModelType {
  namespace: 'lotteryRecord';
  state: RecordModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<RecordModelState>>;
  subscriptions?: { setup: Subscription };
}

const Model: RecordModelType = {
  namespace: 'lotteryRecord',
  state: {},
  reducers: {},
  effects: {
    *getList(action, { call }) {
      const res = yield call(getRecordList, { ...action?.payload });
      if (res.success) {
        res.pageSize = parseInt(res.pageSize, 10);
        res.current = parseInt(res.current, 10);
      }
      return res;
    },
    *deleteRecord(action, { call }) {
      const res = yield call(deleteRecord, { ids: action?.payload || [] });
      return res.success;
    },
  },
};

export default Model;
