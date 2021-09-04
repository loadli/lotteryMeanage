/*
 * @Author: xiaorui
 * @Date: 2021-09-04 20:20:34
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-04 23:26:43
 * @Description: cookie相关操作
 * @FilePath: /lotteryMeanage/client/react/src/utils/index.ts
 */
import { getCookie, setCookie, delCookie } from './cookie';

export const USERID = 'userid';
export const URLREGEXP =
  /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;

/**
 * @description 更新cookie中的userid
 * @param id 用户userid，20分钟内有效
 */
export function setUserId(id?: string) {
  if (id !== undefined) {
    setCookie(USERID, id, 20 * 60 * 1000);
  } else {
    delCookie(USERID);
  }
}

/**
 * @description 获取用户id
 * @returns {string} userid
 */
export function getUserId() {
  return getCookie(USERID);
}

/**
 * @description 判断链接是否合法
 * @param url 完整链接
 * @returns
 */
export function isUrl(url: string) {
  return URLREGEXP.test(url);
}
