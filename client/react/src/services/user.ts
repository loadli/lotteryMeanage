/*
 * @Author: xiaorui
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-04 22:27:21
 * @Description: 用户登陆、登出、获取用户信息
 * @FilePath: /lotteryMeanage/client/react/src/services/user.ts
 */
import { getUserId, setUserId } from '@/utils';
import { request } from 'umi';

import requestUrl from './requestUrl';

type Options<T extends typeof request = typeof request> = T extends (
  data: any,
  options: infer R,
) => any
  ? R
  : never;

/**
 * @description 获取当前的用户
 * @param options
 * @returns
 */
export async function currentUser(options?: Options) {
  const userid = getUserId();
  return request<{
    data: API.CurrentUser;
    error?: string;
  }>(`${requestUrl}/serve/getUser?userid=${userid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录 */
export async function outLogin() {
  setUserId(undefined);
}

/** 登录接口 POST */
export async function login(body: API.LoginParams, options?: Options) {
  console.log(body);
  return request<{
    data: API.CurrentUser;
    error?: string;
  }>(`${requestUrl}/serve/login`, {
    method: 'GET',
    params: {
      ...body,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
    skipErrorHandler: true,
  });
}
