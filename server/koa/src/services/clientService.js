/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:41:28
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 17:17:20
 * @Description  : 前台业务逻辑
 * @FilePath     : \lotteryMeanage\server\koa\src\services\clientService.js
 */

const inspirecloud = require("@byteinspire/api");

// 引入轻服务数据表
// ---------------------------------------------------
// 用户表
const adminTable = require("../models/adminTable");
// // 基础设置表
// const baseSettingTable = require("../models/baseSettingTable");
// // 发货信息表
// const deliveryTable = require("../models/deliveryTable");
// 奖品信息表
const prizeTable = require("../models/prizeTable");
// 抽奖纪录表
const recordTable = require("../models/recordTable");
// ---------------------------------------------------

/**
 * clientService
 * 前台业务具体实现，由 clientController 调用
 */

class clientService {
    /**
     * 获取用户剩余矿石
     */
    async getUser() {
        const adminList = await adminTable.where().find();
        const admin = {
            oreRemain: adminList[0].oreRemain,
        };
        return admin;
    }
    /**
     * 获取抽奖记录
     * @param {string} userId 用户ID
     */
    async myPrize(userId) {
        if (!userId) {
            return [];
        }
        const prizeRecordList = await recordTable
            .where({
                userId,
            })
            .find();
        return prizeRecordList;
    }

    async history(userId) {
        if (!userId) {
            return [];
        }
        const prizeRecordList = await recordTable
            .where({
                userId,
            })
            .find();
        return prizeRecordList;
    }
    async lottery() {
        const prizeList = await prizeTable
            .where(function () {
                return this.prizeRemain > 0;
            })
            .find();
        return prizeList;
    }

    /**
     * 抽奖结束，修改奖品剩余数量
     * @param {object} prize 奖品
     */
    async LotteryEnd(prize) {
        const prizeData = await prizeTable
            .where({
                _id: prize._id,
            })
            .findOne();
        prizeData.prizeRemain--;
        await prizeTable.save(prizeData);
        return prizeData;
    }

    /**
     * 获取地址
     * @param {string} userId 用户ID
     * @param {string} prizeId 奖品ID
     */
    async address(userId, prizeId) {
        if (!userId) {
            return [];
        }
        const prizeRecordList = await recordTable
            .where({
                userId,
                prizeId,
            })
            .find();
        return prizeRecordList;
    }
}

// 导出 Service 的实例
module.exports = new clientService();
