/*
 * @Author: Lee
 * @Date: 2023-03-24 21:42:13
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 09:04:43
 * @Description:
 */

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WX_MODULE_OPTIONS } from './wx.constants';
import { WxModuleAsyncOptions, WxModuleOptions } from './wx.interface';
import { WxService } from './wx.service';

@Module({})
export class WxModule {
  // -- 注册动态模块
  public static forRoot(options: WxModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: WxModule,
      providers: [
        {
          provide: WxService,
          useValue: new WxService(options),
        },
      ],
      exports: [WxService],
    };
  }

  // -- 注册（异步）动态模块
  public static forRootAsync(options: WxModuleAsyncOptions): DynamicModule {
    const providers: Array<Provider> = [];
    if (options.useFactory) {
      providers.push({
        provide: WX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }
    providers.push({
      provide: WxService,
      inject: [WX_MODULE_OPTIONS],
      useFactory: (opts: WxModuleOptions) => new WxService(opts),
    });

    return {
      global: options.isGlobal,
      module: WxModule,
      imports: options.imports,
      providers,
      exports: [WxService],
    };
  }
}
