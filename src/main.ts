/*
 * @Author: Lee
 * @Date: 2022-05-24 16:17:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-24 22:25:50
 * @Description:
 */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/filters/global-exceprtion.filter';
import { RequestInterceptor } from './common/interceptors/request.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { visitor } from './common/middleware/visitor.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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
    /** 设置访问频率 */
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RequestInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // -- swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger 文档示例')
    .setDescription('耀哥Nest.js指南 Apis')
    .setVersion('1.0')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('docs', app, document);

  // -- 监听
  await app.listen(port || 8888);
  // -- 日志输出
  logger.log(`服务已启动...`);
  logger.log(`接口文档：http://localhost:${port}/docs`);
}
bootstrap();
