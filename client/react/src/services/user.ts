import { getUserId, setUserId } from '@/utils';
import { request } from 'umi';

import requestUrl from './requestUrl';

/** 获取当前的用户 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
    error?: string;
  }>(`${requestUrl}/user?id=${getUserId() || ''}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录 */
export async function outLogin(options?: { [key: string]: any }) {
  setUserId(undefined);
}

/** 登录接口 POST */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
    error?: string;
  }>(`${requestUrl}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
