/*
 * @Author: Lee
 * @Date: 2022-05-24 17:39:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:08:12
 * @Description:
 */

export interface IResponse<T = any> {
  code?: number;
  data?: T;
  msg?: string;
  page?: {
    pageNo: number;
    pages: number;
    total: number;
  };
}
