/*
 * @Author: Lee
 * @Date: 2023-02-25 23:30:49
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 11:18:02
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { configuration } from './configs';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { DatabaseModule } from './database/mongose/database.module';
import { RedisModule } from './database/redis';
import * as SharedModules from './shared';

@Module({
  imports: [
    // → 配置模块
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // → 数据库/mongodb
    DatabaseModule,
    // → 数据库/redis
    RedisModule.forRoot({
      config: {
        url: 'redis://127.0.0.1:6379',
      },
    }),
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
