/*
 * @Author: Lee
 * @Date: 2023-02-19 13:00:44
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 00:05:50
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './core/filters/global-exception.filter';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { visitor } from './core/middlewares/logger.middleware';
import { ValidationPipe } from './core/pies/validation.pipe';
import { setupSwagger } from './swaggers';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👉 允许跨域
  app.enableCors();

  // 👉 web 安全，防常见漏洞
  app.use(helmet());

  // 👉 设置访问频率
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1分钟
      max: 5000, // 限制1分钟内最多只能访问5000次
    }),
  );

  // 👉 获取配置信息
  const config = app.get(ConfigService);

  // 👉 接口前缀
  const prefix = config.get<string>('app.prefix');
  app.setGlobalPrefix(prefix);

  // 👉 设置服务
  // → 中间件
  app.use(visitor);
  // → 管道
  app.useGlobalPipes(new ValidationPipe());
  // → 过滤器
  app.useGlobalFilters(new GlobalExceptionsFilter());
  // → 拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new RequestInterceptor());

  // 👉 Swaggers
  setupSwagger(app);

  // 👉 监听端口
  const port = config.get('app.port');

  await app.listen(port);

  // 👉 日志输出
  logger.log(`Server running in ${process.env.NODE_ENV} ...`);
  logger.log(`swagger-ui：http://localhost:${port}/api/docs`);
}
bootstrap();
