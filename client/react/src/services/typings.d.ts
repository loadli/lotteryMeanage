// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    oreRemain: string;
    username: string;
    _id: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
    data?: Array;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  // 抽奖记录
  interface LotteryRecordItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    remaining: string;
    prize_name: string;
    description: string;
    spending: string;
  }

  type LotteryRecordList = LotteryRecordItem[];

  // 发货记录
  interface DeliveryRecordItem {
    _id: string;
    address: string;
    createdAt: string;
    name: string;
    phone: string;
    prizeId: string;
    transport: boolean;
    updatedAt: string;
    userId: string;
    id: string;
  }

  type deliresList = {
    code?: string;
    data?: DeliveryRecordItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type DeliveryListItem = {
    key?: number;
    prizeId?: boolean;
    userId?: string;
    phone?: string;
    address?: string;
    name?: string;
    transport?: string;
    prizeName?: number;
  };

  // 奖品信息
  interface Prize {
    _id: string;
    createdAt: string;
    updatedAt: string;
    enable: string;
    enableDatetime: string;
    name: string;
    prizeRemain: string;
    prizeSum: string;
    probability: string;
    type: string;
    image: string;
  }

  type PrizeList = Prize[];
}
