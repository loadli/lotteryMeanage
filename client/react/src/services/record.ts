import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取当前的用户 */
export async function getRecordList(options?: { [key: string]: any }) {
  return request<{
    data: API.LotteryRecordList;
    error?: string;
  }>(`${requestUrl}/serve/list`, {
    method: 'GET',
    params: options,
  });
}

// /** POST */
// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   return request<{
//     data: API.CurrentUser;
//     error?: string;
//   }>(`${requestUrl}/record/list`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
