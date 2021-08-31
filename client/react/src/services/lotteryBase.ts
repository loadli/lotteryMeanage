import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取矿石数 */
export async function getOreInit() {
  return request(`${requestUrl}/serve/getOreInit`, {
    method: 'GET',
  });
}

/** 获取单次消耗矿石数 */
export async function getOreUse() {
  return request(`${requestUrl}/serve/getOreUse`, {
    method: 'GET',
  });
}

/** 设置矿石数 */
export async function setOreInit(body: any) {
  return request(`${requestUrl}/serve/setOreInit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 设置单次消耗矿石数 */
export async function setOreUse(body: any) {
  return request(`${requestUrl}/serve/setOreUse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
