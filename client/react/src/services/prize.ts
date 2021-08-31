import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取当前的用户 */
export async function getPrizeList(options?: { [key: string]: any }) {
  return request<{
    data: API.LotteryRecordList;
    error?: string;
  }>(`${requestUrl}/record/list`, {
    method: 'GET',
    params: options,
  });
}
