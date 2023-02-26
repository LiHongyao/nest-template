/*
 * @Author: Lee
 * @Date: 2023-02-19 22:08:46
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-22 11:38:58
 * @Description: 
 */

// 👉 自定义装饰器：@Roles([ ... ])
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
