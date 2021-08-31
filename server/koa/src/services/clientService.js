/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:41:28
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 10:58:04
 * @Description  : 前台业务逻辑
 * @FilePath     : \lotteryMeanage\server\koa\src\services\clientService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

// 引入轻服务数据表
// ---------------------------------------------------
// 用户表
const userService = require("../models/userService");
// 基础设置表
const baseSettingTable = require("../models/baseSettingTable");
// 发货信息表
const deliveryTable = require("../models/deliveryTable");
// 奖品信息表
const prizeTable = require("../models/prizeTable");
// 抽奖纪录表
const recordService = require("../models/recordService");
// ---------------------------------------------------

/**
 * clientService
 * 前台业务具体实现，由 clientController 调用
 */

class clientService {}

// 导出 Service 的实例
module.exports = new clientService();
