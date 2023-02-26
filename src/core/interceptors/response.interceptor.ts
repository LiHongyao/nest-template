/*
 * @Author: Lee
 * @Date: 2023-02-19 15:06:25
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 00:54:52
 * @Description: 响应拦截
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/common/dto/res.dto';

const logger = new Logger('response.interceptor');
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse> {
    logger.log('进入全局响应拦截器 >>>');
    // → 实现数据的遍历与转变
    return next.handle().pipe(
      map((response: BaseResponse) => {
        const { code, msg, data, page } = response;
        return {
          code: code ?? 200,
          data: data ?? null,
          msg: msg ?? 'success',
          page: page,
        };
      }),
    );
  }
}
