/*
 * @Author: bohua
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 21:25:19
 * @Description: 发货记录请求
 * @FilePath: /lotteryMeanage/client/react/src/pages/DeliveryRecord/services.ts
 */
import { request } from 'umi';

import requestUrl from '@/services/requestUrl';

/**
 * 获取发货记录的list
 * @param {*} options
 */
export async function getDeliveryRecordList(options?: { [key: string]: any }) {
  return request<{
    data: API.DeliveryRecordItem[];
    error?: string;
    code: string;
  }>(`${requestUrl}/serve/transport`, {
    method: 'GET',
    params: options,
  });
}

export async function changeTransportStatus(body: any) {
  return request(`${requestUrl}/serve/setTransport`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
