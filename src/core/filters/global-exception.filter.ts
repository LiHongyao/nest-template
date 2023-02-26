/*
 * @Author: Lee
 * @Date: 2023-02-19 17:59:58
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-22 22:33:14
 * @Description:
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

const logger = new Logger('global-exceprtion.filter');

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  // -- exception：当前正在处理的异常对象
  // -- host：传递给原始处理程序的参数的一个包装（Request/Response）的引用
  catch(exception: any, host: ArgumentsHost) {
    logger.log('进入全局异常捕获 >>>');
    const ctx = host.switchToHttp(); /** 获取请求上下文 */
    const request = ctx.getRequest<Request>(); /** 获取请求上下文中的request对象 */
    const response = ctx.getResponse<Response>(); /** 获取请求上下文中的response对象 */
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception.response);
    const message = status >= 500 ? '服务器繁忙~' : exception.message;
    logger.error(`异常信息 >> ${exception}`);
    // -- 设置响应头
    response.setHeader("Content-Type", 'application/json; charset=utf-8')
    // -- 抛出错误信息
    // -- 和全局响应拦截结构保持一致
    response.status(200).json({
      code: status,
      data: null,
      msg: message,
    });
  }
}
