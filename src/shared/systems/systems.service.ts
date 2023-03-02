import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponse } from 'src/common/dto/res.dto';
import { findPathByLeafId, fomartToTree, lookForAllIds } from 'src/utils';
import { AccessAddOrUpdateDto, RoleAddOrUpdateDto } from './dto/req.dto';
import {
  AccessDocument,
  AdministratorDocument,
  RoleDocument,
} from 'src/database/mongose/schemas';
import * as dayjs from 'dayjs';

@Injectable()
export class SystemsService {
  constructor(
    @InjectModel('ACCESS_MODEL')
    private readonly accessModel: Model<AccessDocument>,

    @InjectModel('ROLE_MODEL')
    private readonly roleModel: Model<RoleDocument>,

    @InjectModel('ADMINISTRATOR_MODEL')
    private readonly adminModel: Model<AdministratorDocument>,
  ) {}

  /**
   * 添加或编辑权限
   * @param dto
   * @returns
   */
  async accessAddOrUpdate(dto: AccessAddOrUpdateDto) {
    const { authId, parentId, ...fields } = dto;
    if (authId) {
      // -- 编辑
      await this.accessModel.findByIdAndUpdate(authId, { ...fields });
    } else {
      // -- 新增
      await new this.accessModel({ parentId, ...fields }).save();
    }
    return {};
  }

  /**
   * 查询权限列表
   * @returns
   */
  async accessList(): Promise<BaseResponse> {
    const results = await this.accessModel.aggregate([
      { $match: {} },
      { $addFields: { id: '$_id' } },
      { $project: { _id: 0 } },
    ]);
    const responseData = fomartToTree(results ?? []);
    return { data: responseData };
  }

  /**
   * 删除权限
   * @param authId
   * @returns
   */
  async accessRemove(authId: string): Promise<BaseResponse> {
    // -- 查询所有记录
    const dbRecords = await this.accessModel.find<AccessDocument>();
    // -- 组合数据
    const tree = fomartToTree(dbRecords ?? []);
    // -- 找到当前节点及所有子节点
    const node = findPathByLeafId(authId, tree);
    if (node) {
      // -- 获取ids
      const ids = lookForAllIds([node]);
      // -- 查询删除
      await this.accessModel.deleteMany({
        _id: { $in: ids },
      });
      return {};
    } else {
      return { code: HttpStatus.BAD_REQUEST, msg: 'id不存在' };
    }
  }

  /**
   * 新增或编辑角色
   * @param dto
   */
  async roleAddOrUpdate(dto: RoleAddOrUpdateDto, userId: string) {
    // -- 查询操作人信息
    const dbAdmin = await this.adminModel.findById<AdministratorDocument>(
      userId,
    );
    const { roleId, ...fileds } = dto;
    if (roleId) {
      // -- 编辑角色
      await this.roleModel.findByIdAndUpdate(roleId, {
        ...fileds,
        updateBy: dbAdmin.nickname,
        updateDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } else {
      // -- 新增角色
      await new this.roleModel({
        ...dto,
        createBy: dbAdmin.nickname,
        createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }).save();
    }
    return {};
  }

  /**
   * 查询角色列表
   */
  async roleList(): Promise<BaseResponse> {
    const results = await this.roleModel.aggregate([
      { $match: { state: 1 } },
      { $addFields: { id: '$_id' } },
      { $project: { _id: 0 } },
    ]);
    return { data: results ?? [] };
  }

  /**
   * 删除角色
   * @param roleId
   * @returns
   */
  async roleRemove(roleId: string): Promise<BaseResponse> {
    await this.roleModel.findByIdAndUpdate(roleId, { state: 0 });
    return {};
  }
}
