/*
 * @Author: Lee
 * @Date: 2023-02-19 16:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-19 16:42:26
 * @Description: 类型定义
 */
import type { config as base } from './envs/default';
import type { config as dev } from './envs/production';
import type { config as pro } from './envs/development';
import type { config as test } from './envs/test';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Development = typeof dev;
export type Production = typeof pro;
export type Test = typeof test;
export type Config = Default & Development & Production & Test;
