/*
 * @Author: Lee
 * @Date: 2022-05-24 16:17:17
 * @LastEditors: Lee
 * @LastEditTime: 2022-06-21 14:25:16
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configs';
// import { AuthModule } from './auth/auth.module';
import { UploadModule } from './shared/upload/upload.module';
// import { DatabaseModule } from './database/database.module';
// import { UserModule } from './shared/user/user.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './core/guards/jwt-auth.guard';

@Module({
  imports: [
    // -- configs
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // -- database of mongodb
    // DatabaseModule,
    // -- auth
    // AuthModule,
    // -- business moduless
    UploadModule,
    // UserModule,
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
