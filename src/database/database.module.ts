/*
 * @Author: Lee
 * @Date: 2022-05-24 17:38:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-27 16:37:15
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserSchema } from './schemas/user.shema';

// -- 定义Model，使用 forFeature() 方法定义在当前范围中注册哪些存储库。
// -- 如果有多张表，直接在数组中加配置就可以了
const MONGO_MODELS = MongooseModule.forFeature([
  { name: 'USER_MODEL', schema: UserSchema },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoose.uri'),
      }),
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DatabaseModule {}
