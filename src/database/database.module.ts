/*
 * @Author: Lee
 * @Date: 2022-05-24 17:38:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-26 21:54:58
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

// -- 配置数据库库，并将其应用到全局
@Global()
@Module({
  imports: [
    // -- 链接数据库/这里通过配置文件获取链接uri
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoose.uri'),
      }),
    }),
    // -- 数据库相关模型
    MONGO_MODELS,
  ],
  // -- 导出定义好的Models，并于在其他模块中更直接注入（因为使用了@Global装饰器将此模块声明成全局模块）
  exports: [MONGO_MODELS],
})
export class DatabaseModule {}
