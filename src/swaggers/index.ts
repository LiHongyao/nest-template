/*
 * @Author: Lee
 * @Date: 2023-02-19 16:03:16
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:34:26
 * @Description:
 */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  // → 构建SwaggerOptions
  const swaggerOptions = new DocumentBuilder()
    .setTitle('李鴻耀同學·接口文档')
    .addTag('APIs', '天道酬勤')
    .setDescription('Swagger-ui Apis.')
    .setVersion('1.0')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .addServer('http://localhost:9999', '开发环境服务')
    .addServer('http://localhost:8888', '测试环境服务')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .setContact(
      '李鴻耀同學',
      'https://github.com/lihongyao',
      'lihy_online@163.com',
    )
    .build();
  // → 生成文档`
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  // → 设置文档
  SwaggerModule.setup('api/docs', app, document);
};
