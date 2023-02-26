import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { addSalt, encript } from 'src/utils';

const logger = new Logger('hash-password.middleware');

/**
 * 加密中间件
 * 1. 注册用户时，前端发送过来的密码需加密存到数据库中，存储到数据库时，对应的salt也要存进去便于后期校验
 * 2. 验证用户时，将前端发送过来的密码和数据库里对应用户的salt进行加密，再和数据库里存储的加密密码比较密码是否正确
 */
@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    logger.log('>>> 密码加密');
    const password = req.body['password'];
    if (password) {
      const salt = addSalt();
      req.body['password'] = encript(password, salt);
      req.body['salt'] = salt;
    }
    next();
  }
}
