
/*
 * @Author: Lee
 * @Date: 2023-02-19 15:38:32
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-19 15:39:59
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';



const logger = new Logger('logger.middleware');
export function visitor(req: Request, res: Response, next: NextFunction) {
  const { method, path, ip } = req;
  logger.log(`visit：${method} ${path} at ${ip}`);
  next();
}
