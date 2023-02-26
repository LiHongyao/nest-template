/*
 * @Author: Lee
 * @Date: 2023-02-19 15:24:05
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-19 15:42:45
 * @Description:
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const logger = new Logger('request.interceptor');

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
