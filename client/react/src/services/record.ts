/*
 * @Author: guohua
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 21:01:42
 * @Description: 抽奖记录相关操作
 * @FilePath: /lotteryMeanage/client/react/src/services/record.ts
 */
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
  return request<{
    data: any;
    error?: string;
  }>(`${requestUrl}/serve/delete`, {
    method: 'POST',
    data: options,
  });
}
