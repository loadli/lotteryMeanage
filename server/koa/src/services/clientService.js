/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:41:28
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-01 10:07:09
 * @Description  : 前台业务逻辑
 * @FilePath     : \lotteryMeanage\server\koa\src\services\clientService.js
 */

const inspirecloud = require("@byteinspire/api");

// 引入轻服务数据表
// ---------------------------------------------------
// 用户表
const userTable = require("../models/userTable");
// // 基础设置表
const baseSettingTable = require("../models/baseSettingTable");
// // 发货信息表
// const deliveryTable = require("../models/deliveryTable");
// 奖品信息表
const prizeTable = require("../models/prizeTable");
// 抽奖纪录表
const recordTable = require("../models/recordTable");
// ---------------------------------------------------
// 通过new ObjectId(id)去生成ObjectId
const ObjectId = inspirecloud.db.ObjectId
/**
 * clientService
 * 前台业务具体实现，由 clientController 调用
 */

class clientService {
    /**
     * 创建一个用户id
     */
    async createUser() {
        const oreInit = await baseSettingTable
            .where({
                key: "oreInit",
            })
            .findOne();

        const initUser = {
            oreRemain: oreInit.value,
        };
        return await userTable.save(initUser);
    }
    /**
     * 获取用户剩余矿石
     */
    async oreRemain(id) {
        const user = await userTable.where({ _id: ObjectId(id)}).findOne();
        return user;
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
     * @param {string} name 姓名
     * @param {string} phone 手机号
     * @param {string} address 地址
     */
    async address(body) {
        console.log('body', body)
        return await recordTable.save(body);;
    }
}

// 导出 Service 的实例
module.exports = new clientService();
