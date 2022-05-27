/*
 * @Author: Lee
 * @Date: 2022-05-24 16:17:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 17:55:18
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './core/pipes/validation.pipe';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import { visitor } from './core/middleware/visitor.middleware';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { GlobalExceptionsFilter } from './core/filters/global-exceprtion.filter';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -- 获取配置信息
  const config = app.get(ConfigService);
  const prefix = config.get<string>('app.prefix');
  const port = config.get<string>('app.port');

  // -- 配置服务
  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.use(visitor);
  app.use(helmet()); /** web 安全，防常见漏洞（设置请求头） */
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);
  await app.listen(port || 8888);

  logger.log(`服务已启动...`);
  logger.log(`接口文档：http://localhost:${port}/api/docs`);
}
bootstrap();
