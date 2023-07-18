/*
 * @Author: Lee
 * @Date: 2023-03-24 21:45:33
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-25 13:24:51
 * @Description:
 */

import { ModuleMetadata } from '@nestjs/common';

/**
 * Only one property required of keys of type T，e.g.
 * 指定类型 T 的属性中只选一，比如:
 * RequireOnlyOne<RefundParameters, 'transaction_id' | 'out_trade_no'>
 */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

/**
 * 同步注册模块 - 配置项
 */
export interface WxModuleOptions {
  isGlobal?: boolean;
  appID: string;
  appsecret: string;
}

/**
 * 异步注册模块 - 配置项
 */
export interface WxModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<WxModuleOptions> | WxModuleOptions;
}

/**
 * 默认返回
 */
export interface DefaultRequestResult {
  errcode: number;
  errmsg: string;
}

/**
 * 获取接口调用凭据参数
 */
export interface AccessTokenResult extends DefaultRequestResult {
  access_token: string;
  expires_in: number;
}

/**
 * 获取手机号码返回结果
 */
export interface PhoneNumberResult extends DefaultRequestResult {
  phone_info: {
    phoneNumber: string;
    purePhoneNumber: string;
    countryCode: number;
    watermark: {
      timestamp: number;
      appid: string;
    };
  };
}

/**
 * 登录凭证校验
 */
export interface SessionResult extends DefaultRequestResult {
  openid: string;
  session_key: string;
  unionid?: string;
}

// =============================== 微信支付相关 ===============================
/**
 * 微信支付下单数据结构
 */
export interface TransactionOrder {
  /** 应用ID */
  appid: string;
  /** 直连商户号 */
  mchid: string;
  /** 商品描述 */
  description: string;
  /** 商户订单号 */
  out_trade_no: string;
  /** 交易结束时间,格式：2018-06-08T10:34:56+08:00 */
  time_expire?: string;
  /** 附加数据 */
  attach?: string;
  /** 通知地址 */
  notify_url: string;
  /** 订单优惠标记 */
  goods_tag?: string;
  /** 订单金额 */
  amount: {
    total: number;
    currency: 'CNY';
  };
  /** 支付者 */
  payer: { openid: string };
  /** 优惠功能 */
  detail?: {
    cost_price?: number;
    invoice_id?: string;
    goods_detail?: {
      merchant_goods_id: string;
      wechatpay_goods_id?: string;
      goods_name?: string;
      quantity: number;
      unit_price: number;
    }[];
  };
  /** 场景信息 */
  scene_info?: {
    payer_client_ip: string;
    device_id?: string;
    store_info?: {
      id: string;
      name?: string;
      area_code?: string;
      address?: string;
    };
  };
  /** 结算信息 */
  settle_info?: {
    profit_sharing?: boolean;
  };
}

/**
 * 小程序支付参数
 */
export interface MiniProgramPaymentParameters {
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: 'RSA';
  paySign: string;
}

export interface CallbackResource {
  original_type: string;
  algorithm: string;
  ciphertext: string;
  associated_data: string;
  nonce: string;
}
export interface CertificateResult {
  serial_no: string;
  effective_time: string;
  expire_time: string;
  encrypt_certificate: {
    algorithm: string;
    nonce: string;
    associated_data: string;
    ciphertext: string;
  };
}

/**
 * 申请退款参数
 */
export interface RefundParameters {
  transaction_id: string;
  out_trade_no: string;
  out_refund_no: string;
  reason?: string;
  notify_url?: string;
  funds_account?: 'AVAILABLE';
  amount: {
    refund: number;
    from?: {
      account: 'AVAILABLE' | 'UNAVAILABLE';
      amount: number;
    }[];
    total: number;
    currency: 'CNY';
  };
  goods_detail?: RefundGoodDetail[];
}

/**
 * 退款商品
 */
export interface RefundGoodDetail {
  merchant_goods_id: string;
  wechatpay_goods_id?: string;
  goods_name?: string;
  unit_price: number;
  refund_amount: number;
  refund_quantity: number;
}

export interface RefundResult {
  refund_id: string;
  out_refund_no: string;
  transaction_id: string;
  out_trade_no: string;
  channel: RefundChannel;
  /**
   * 退款入账账户
   * 取当前退款单的退款入账方，有以下几种情况：
   * 1）退回银行卡：{银行名称}{卡类型}{卡尾号}
   * 2）退回支付用户零钱:支付用户零钱
   * 3）退还商户:商户基本账户商户结算银行账户
   * 4）退回支付用户零钱通:支付用户零钱通
   * 示例值：招商银行信用卡0403
   */
  user_received_account: string;
  success_time?: string;
  create_time: string;
  status: RefundStatus;
  funds_account?: FundsAccount;
  amount: {
    total: number;
    refund: number;
    from?: {
      account: 'AVAILABLE' | 'UNAVAILABLE';
      amount: number;
    }[];
    payer_total: number;
    payer_refund: number;
    settlement_refund: number;
    settlement_total: number;
    discount_refund: number;
    currency: 'CNY';
  };
  promotion_detail?: {
    promotion_id: string;
    scope: 'GLOBAL' | 'SINGLE';
    type: string;
    amount: number;
    refund_amount: number;
    goods_detail?: RefundGoodDetail[];
  }[];
}

/**
 * 退款状态
 */
export enum RefundStatus {
  SUCCESS = 'SUCCESS',
  CLOSED = 'CLOSED',
  PROCESSING = 'PROCESSING',
  ABNORMAL = 'ABNORMAL',
}

/**
 * 资金账户
 */
export enum FundsAccount {
  /** 未结算资金 */
  UNSETTLED = 'UNSETTLED',
  /** 可用余额 */
  AVAILABLE = 'AVAILABLE',
  /** 不可用余额 */
  UNAVAILABLE = 'UNAVAILABLE',
  /** 运营户 */
  OPERATION = 'OPERATION',
  /** 基本账户（含可用余额和不可用余额） */
  BASIC = 'BASIC',
}

/**
 * 退款渠道
 */
export enum RefundChannel {
  /** 原路退款 */
  ORIGINAL = 'ORIGINAL',
  /** 退回到余额 */
  BALANCE = 'BALANCE',
  /** 原账户异常退到其他余额账户 */
  OTHER_BALANCE = 'OTHER_BALANCE',
  /** 原银行卡异常退到其他银行卡 */
  OTHER_BANKCARD = 'OTHER_BANKCARD',
}

/**
 * 交易状态
 */
export enum TradeStatus {
  /**
   * 支付成功
   */
  SUCCESS = 'SUCCESS',
  /**
   * 转入退款
   */
  REFUND = 'REFUND',
  /**
   * 未支付
   */
  NOTPAY = 'NOTPAY',
  /**
   * 已关闭
   */
  CLOSED = 'CLOSED',
  /**
   * 已撤销（仅付款码支付会返回）
   */
  REVOKED = 'REVOKED',
  /**
   * 用户支付中（仅付款码支付会返回）
   */
  USERPAYIN = 'USERPAYIN',
  /**
   * 支付失败（仅付款码支付会返回）
   */
  PAYERROR = 'PAYERROR',
}

/**
 * 交易类型
 */
export enum TradeType {
  /** 公从号支付 */
  JSAPI = 'JSAPI',
  /** 扫码支付 */
  NATIVE = 'NATIVE',
  /** APP支付 */
  APP = 'APP',
  /** 付款码支付 */
  MICROPAY = 'MICROPAY',
  /** H5支付 */
  MWEB = 'MWEB',
  /** 刷脸支付 */
  FACEPAY = 'FACEPAY',
}

/**
 * 微信支付订单
 */
export interface Trade extends Omit<TransactionOrder, 'scene_info' | 'amount'> {
  /** 微信支付订单号 */
  transaction_id?: string;
  /** 交易类型 */
  trade_type?: TradeType;
  /** 交易状态 */
  trade_state: TradeStatus;
  /** 交易状态描述 */
  trade_state_desc: string;
  /** 付款银行 */
  bank_type?: string;
  /**
   * 支付完成时间
   * yyyy-MM-DDTHH:mm:ss+TIMEZONE
   * 2018-06-08T10:34:56+08:00
   */
  success_time?: string;
  /** 订单金额 */
  amount?: {
    /** 总金额，单位分 */
    total?: number;
    /**
     * 用户支付金额
     * 用户支付金额，单位为分。（指使用优惠券的情况下，这里等于总金额-优惠券金额）
     */
    payer_total?: number;
    /**
     * 货币类型
     * CNY：人民币，境内商户号仅支持人民币。
     */
    currency?: 'CNY';
    /** 用户支付币种 */
    payer_currency?: string;
  };
  /** 场景信息 */
  scene_info?: {
    /**
     * 商户端设备号
     * 商户端设备号（发起扣款请求的商户服务器设备号）。
     */
    device_id?: string;
  };
  promotion_detail?: {
    /** 券ID */
    coupon_id: string;
    /** 优惠名称 */
    name?: string;
    /**
     * 优惠范围
     * GLOBAL：全场代金券 SINGLE：单品优惠
     */
    scope?: 'GLOBAL' | 'SINGLE';
    /**
     * 优惠类型
     * CASH：充值型代金券 NOCASH：免充值型代金券
     */
    type?: 'CASH' | 'NOCASH';
    /** 优惠券面额 */
    amount: number;
    /** 活动ID */
    stock_id?: string;
    /** 微信出资，单位为分 */
    wechatpay_contribute?: number;
    /** 商户出资，单位为分 */
    merchant_contribute?: number;
    /** 其他出资，单位为分 */
    other_contribute?: number;
    /** 优惠币种 */
    currency?: 'CNY';
    /** 单品列表 */
    goods_detail?: TradeGood[];
  };
}

export interface TradeGood {
  /** 商品编码 */
  goods_id: string;
  /** 商品数量 */
  quantity: number;
  /** 商品单价，单位为分 */
  unit_price: number;
  /** 商品优惠金额 */
  discount_amount: number;
  /** 商品备注信息 */
  goods_remark?: string;
}
