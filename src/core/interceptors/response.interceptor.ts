/*
 * @Author: Lee
 * @Date: 2022-05-24 22:07:11
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 16:51:14
 * @Description: 自定义响应拦截器
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    // 实现数据的遍历与转变
    return next.handle().pipe(
      map((response: IResponse) => {
        const { code, msg, data, page } = response;
        return {
          code: code || 0,
          data: data || null,
          msg: msg || 'success',
          page,
        };
      }),
    );
  }
}
