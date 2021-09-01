import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取抽奖记录 */
export async function getRecordList(options?: { [key: string]: any }) {
  return request<{
    data: API.LotteryRecordList;
    error?: string;
  }>(`${requestUrl}/serve/list`, {
    method: 'GET',
    params: options,
  });
}

export async function deleteRecord(options?: { [key: string]: any }) {
  console.log(options)
  return request<{
    data: any,
    error?: string
  }>(`${requestUrl}/serve/delete`, {
    method: 'POST',
    params: options
  })
}
