import { request } from 'umi';

import requestUrl from '@/services/requestUrl';

/**
 * 获取发货记录的list
 * @param {*} options 
 */
export async function getDeliveryRecordList(options?: { [key: string]: any }) {
  return request<{
    data: API.DeliveryRecordItem;
    error?: string;
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