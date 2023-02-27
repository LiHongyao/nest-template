/*
 * @Author: Lee
 * @Date: 2023-02-19 18:32:48
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-27 19:41:57
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-02-19 18:32:48
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 00:35:42
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccessSchema,
  AddressSchema,
  AdministratorSchema,
  BannerSchema,
  ConfigsSchema,
  FeedbackSchema,
  RoleSchema,
  UserSchema,
} from './schemas';

// -- 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库。
// -- 如果有多张表，直接在数组中加配置就可以了
const MONGO_MODELS = MongooseModule.forFeature([
  { name: 'CONFIGS', schema: ConfigsSchema },
  { name: 'USER_MODEL', schema: UserSchema },
  { name: 'BANNER_MODEL', schema: BannerSchema },
  { name: 'ADMINISTRATOR_MODEL', schema: AdministratorSchema },
  { name: 'CONFIGS_MODEL', schema: ConfigsSchema },
  { name: 'ACCESS_MODEL', schema: AccessSchema },
  { name: 'ROLE_MODEL', schema: RoleSchema },
  { name: 'FEEDBACK_MODEL', schema: FeedbackSchema },
  { name: 'ADDRESS_MODEL', schema: AddressSchema },
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
