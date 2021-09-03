/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:41:28
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 14:00:17
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
const deliveryTable = require("../models/deliveryTable");
// 奖品信息表
const prizeTable = require("../models/prizeTable");
// 抽奖纪录表
const recordTable = require("../models/recordTable");
// ---------------------------------------------------
// 通过new ObjectId(id)去生成ObjectId
const ObjectId = inspirecloud.db.ObjectId;
/**
 * clientService
 * 前台业务具体实现，由 clientController 调用
 */

class clientService {
    /**
     * 创建一个用户id
     */
    async createUser() {
        const baseSetting = await baseSettingTable
            .where({
                key: "oreInit",
            })
            .findOne();
        const oreInit = {
            oreRemain: baseSetting.value,
        };
        return await userTable.save(oreInit);
    }
    /**
     * 获取用户剩余矿石
     */
    async oreRemain(id) {
        const user = await userTable.where({ _id: ObjectId(id) }).findOne();
        return user;
    }

    /**
     * 获取用户剩余矿石
     */
    async oreUse() {
        const oreUse = await baseSettingTable
            .where({
                key: "oreUse",
            })
            .findOne();
        return oreUse.value || 999999;
    }
    /**
     * 获取抽奖记录
     * @param {string} userId 用户ID
     */
    async myPrize(userId) {
        if (!userId) {
            return [];
        }
        let deliveryList = await deliveryTable
            .where({
                userId,
            })
            .find();
        let prizeAll = await prizeTable.where().find();

        deliveryList.forEach((item) => {
            console.log(item.prizeId.toString());
            console.log("---");
            let prize = prizeAll.find((prizeItem) => {
                console.log(prizeItem._id);
                return prizeItem._id.toString() == item.prizeId.toString();
            });
            item.image = prize.image;

        });

        return deliveryList;
    }

    async history(userId) {
        if (!userId) {
            return [];
        }
        let prizeRecordList = await recordTable
            .where({
                userId,
            })
            .find();

        return prizeRecordList;
    }

    /**
     * 获取参与抽奖的奖品
     */
    async lottery() {
        const prizeList = await prizeTable
            .where(function () {
                const current = new Date();
                return this.prizeRemain > 0 && this.enable && current >= new Date(this.enableDatetime);
            })
            .find();
        return prizeList;
    }

    /**
     * 抽奖结束，修改部分数值
     * @param {object} userid 用户id
     * @param {object} prize 奖品
     */
    async LotteryEnd(userid, prize) {
        // 减少商品库存
        await this.LotteryReamin(prize);
        console.log("库存减少成功");

        // 减少用户剩余矿石数
        await this.oreRemainLess(userid);
        console.log("矿石减少成功");

        // 抽中矿石增加66
        if (prize.name == "66矿石") {
            await this.oreRemainAdd(userid);
            console.log("矿石增加成功");
        }

        // 写入抽奖纪录
        await this.LotteryRecord(userid, prize);
        console.log("抽奖纪录写入成功");

        if (prize.type == "02") {
            // 写入实物纪录
            await this.LotteryDelivery(userid, prize);
            console.log("实物纪录写入成功");
        }
    }

    /**
     * 抽奖结束，减少奖品库存
     * @param {object} prize 奖品
     */
    async LotteryReamin(prize) {
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
     * 抽奖结束，添加矿石数量
     * @param {object} prize 奖品
     */
    async oreRemainAdd(userid) {
        // 修改矿石数
        const user = await userTable.where({ _id: ObjectId(userid) }).findOne();
        user.oreRemain += 66;
        await userTable.save(user);
        return user;
    }

    /**
     * 抽奖结束，减少用户矿石数
     * @param {object} prize 奖品
     */
    async oreRemainLess(userid) {
        // 获取单次消耗
        const oreUse = await this.oreUse();
        // 修改矿石数
        const user = await userTable.where({ _id: ObjectId(userid) }).findOne();

        user.oreRemain -= oreUse;
        // console.log(user.oreRemain,baseSetting.value);
        await userTable.save(user);
        return user;
    }

    /**
     * 抽奖结束，写入抽奖纪录
     * @param {object} prize 奖品
     */
    async LotteryRecord(userid, prize) {
        const oreUse = await this.oreUse();

        const remain = await this.oreRemain(userid);

        const recordItem = {
            userId: userid,
            prizeId: prize._id,
            oreUse: oreUse,
            oreRemain: remain.oreRemain,
            datetime: new Date(),
            prizeType: prize.type,
            prizeName: prize.name,
        };

        return await recordTable.save(recordItem);
    }

    /**
     * 抽奖结束，写入实物纪录
     * @param {object} prize 奖品
     */
    async LotteryDelivery(userid, prize) {
        const deliveryItem = {
            userId: userid,
            prizeId: prize._id,
            prizeName: prize.name,
        };

        return await deliveryTable.save(deliveryItem);
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
        let prizeInfo = await prizeTable.where({ _id: new ObjectId(body.prizeId) }).findOne();
        let requestBody = {
            ...body,
            transport: false, // 是否发货
            prizeName: prizeInfo.name, // 奖品名
        };
        return await deliveryTable.save(requestBody);
    }
}

// 导出 Service 的实例
module.exports = new clientService();
