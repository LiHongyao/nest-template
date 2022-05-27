import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (dayjs().isBefore('2022/05/10 10:00:00')) {
      throw new HttpException('活动未开始', HttpStatus.BAD_REQUEST);
    }
    if (dayjs().isAfter('2022/05/30 20:00:00')) {
      throw new HttpException('活动已结束', HttpStatus.BAD_REQUEST);
    }
    return next.handle();
  }
}
