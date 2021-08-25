import type { Effect, Reducer, Subscription } from 'umi';

export interface RecordModelState {
  name: string;
}

export interface RecordModelType {
  namespace: 'record';
  state: RecordModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<RecordModelState>>;
  subscriptions?: { setup: Subscription };
}

const Model: RecordModelType = {
  namespace: 'record',
  state: {
    name: '',
  },
  reducers: {},
  effects: {},
};

export default Model;
