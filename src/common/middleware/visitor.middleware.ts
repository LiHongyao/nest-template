/*
 * @Author: Lee
 * @Date: 2022-05-24 22:01:04
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:05:17
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const logger = new Logger('logger.middleware');
export function visitor(req: Request, res: Response, next: NextFunction) {
  const { method, path, ip } = req;
  logger.log(`访问信息：${method} ${path} at ${ip}`);
  next();
}
