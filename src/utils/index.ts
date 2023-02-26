/*
 * @Author: Lee
 * @Date: 2023-02-19 22:44:45
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-26 23:04:07
 * @Description:
 */
import * as crypto from 'crypto';

/**
 * 获取加密盐值
 * @returns
 */
export function addSalt() {
  return crypto.randomBytes(16).toString('base64');
}

/**
 * 对密码进行加密
 * @param password 密码
 * @param salt  盐值
 * @returns
 */
export function encript(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 16, 'sha256')
    .toString('base64');
}

/**
 * 将展开数组根据parentId组合嵌套
 * 主要用于树形结构的数据处理
 * 因为存储在数据库是以单条记录的形式存储的，返回给前端时需要组合嵌套
 * @param list
 * @returns
 */
export function fomartToTree(list: Array<any>) {
  // -- 第1层循环：filter 会遍历原数组的每一项
  // -- 因为有children引用的存在，返回值只需要返回第一层数据就可以了
  return list.filter(function (parent) {
    // -- 第2层循环：遍历原数组的每一项，找出当前项的所有子节点
    let branchArr = list.filter(function (child) {
      return parent.id == child.parentId;
    });
    // -- 为当前项数据追加children引用
    // -- 格式处理：如果branchArr的长度为0，返回null，否则返回branchArr
    parent.children = branchArr.length === 0 ? undefined : branchArr;
    // -- 过滤出第一层
    return !parent.parentId;
  });
}

/**
 * 根据ID查找树节点
 * 主要用于树形结构的数据处理
 * @param leafId 需要查找的id值
 * @param nodes 查找源
 * @param path 递归时使用
 * @returns
 */
export function findPathByLeafId(
  leafId: string,
  nodes: Array<any>,
  path?: Record<string, any>,
) {
  if (path === undefined) {
    path = {};
  }
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = path;
    if (leafId == nodes[i].id) {
      tmpPath = nodes[i];
      return tmpPath;
    }
    if (nodes[i].children) {
      var findResult = findPathByLeafId(leafId, nodes[i].children, tmpPath);
      if (findResult) {
        return findResult;
      }
    }
  }
}

/**
 * 查找节点极其所有子节点的id集合
 * @param data 
 * @param arr 
 * @returns 
 */
export function lookForAllIds(data: Array<any>, arr = []) {
  for (const item of data) {
    arr.push(item.id);
    if (item.children && item.children.length)
      lookForAllIds(item.children, arr);
  }
  return arr;
};
