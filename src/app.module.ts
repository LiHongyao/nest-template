/*
 * @Author: Lee
 * @Date: 2022-05-24 16:17:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 20:13:24
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configs';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './shared/hello/hello.module';
import { UploadModule } from './shared/upload/upload.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './shared/user/user.module';

@Module({
  imports: [
    // -- configs
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // -- mongodb
    DatabaseModule,
    // -- auth
    AuthModule,
    // -- 业务模块
    HelloModule,
    UploadModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
