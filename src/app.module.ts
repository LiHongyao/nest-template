/*
 * @Author: Lee
 * @Date: 2023-02-25 23:30:49
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 11:39:01
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { configuration } from './configs';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { DatabaseModule } from './database/mongose/database.module';
import * as SharedModules from './shared';

@Module({
  imports: [
    // → 配置模块
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // → 数据库
    DatabaseModule,
    // → 业务模块
    ...Object.values(SharedModules),
  ],
  providers: [
    // → Global Guard, Authentication check on all routers
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [],
})
export class AppModule {}
