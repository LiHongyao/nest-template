/*
 * @Author: Lee
 * @Date: 2023-03-24 22:50:24
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:31:20
 * @Description:
 */
import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { WxModule } from 'src/libs/wx';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // → 注册微信模块
    WxModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        appID: config.get<string>('mp.appID'),
        appsecret: config.get<string>('mp.appsecret'),
      }),
    }),
  ],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
