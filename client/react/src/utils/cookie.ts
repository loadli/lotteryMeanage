/*
 * @Author: xiaorui
 * @Date: 2021-09-04 20:51:12
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-04 21:21:26
 * @Description: cookie相关操作
 * @FilePath: /lotteryMeanage/client/react/src/utils/cookie.ts
 */

/**
 * @description 获取cookie,若不存在返回空字符串
 * @param {string} name cookie的key值
 * @returns {string} value
 */
export function getCookie(name: string) {
  if (!name) return '';
  const cookieArr = document.cookie.split('; ');
  for (let i = 0; i < cookieArr.length; i++) {
    const [key, value] = cookieArr[i].split('=');
    if (key === escape(name)) return unescape(value);
  }
  return '';
}

/**
 * @description 设置cookie
 * @param {string} name cookie的key值
 * @param {string} value cookie的值
 * @param {number} expireTime 过期时间，单位为ms
 */
export function setCookie(name: string, value: string, expireTime?: number) {
  let str = `${escape(name)}=${escape(value)}`;
  if (expireTime !== undefined) {
    const now = new Date();
    now.setTime(now.getTime() + expireTime);
    str += `; expires=${now.toUTCString()}`;
  }
  document.cookie = str;
}

/**
 * @description 删除cookie
 * @param name cookie的key值
 */
export function delCookie(name: string) {
  setCookie(name, '', -1);
}
