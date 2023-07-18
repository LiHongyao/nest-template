/*
 * @Author: Lee
 * @Date: 2023-03-25 00:14:20
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 12:44:56
 * @Description:
 */

import * as crypto from 'crypto';

/**
 * 指定长度随机字符串
 *
 * @param length
 * @returns
 */
export function createNonceStr(length = 16): string {
  length = length > 32 ? 32 : length;
  let str = '';
  const chars =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
