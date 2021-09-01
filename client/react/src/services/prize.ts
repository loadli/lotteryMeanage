import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取奖品信息 */
export async function getPrizeList(options?: { [key: string]: any }) {
  return request<{
    data: API.LotteryRecordList;
    error?: string;
  }>(`${requestUrl}/serve/prizeList`, {
    method: 'GET',
    params: options,
  });
}

export async function transAble(options?: { [key: string]: any }) {
  return request<{
    data: API.LotteryRecordList;
    error?: string;
  }>(`${requestUrl}/serve/setEnable`, {
    method: 'POST',
    params: options,
  });
}
