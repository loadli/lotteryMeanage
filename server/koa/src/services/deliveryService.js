/*
 * @Author       : xiaolin
 * @Date         : 2021-09-03 15:28:21
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 14:10:29
 * @Description  : 实物相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\DeliveryService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId     = inspirecloud.db.ObjectId;

// ---------------------------------------------------
const deliveryTable = require("../models/deliveryTable");  // 实物表
const prizeTable    = require("../models/prizeTable");     // 奖品表
// ---------------------------------------------------

/**
 * DeliveryService
 */
class DeliveryService {
    /**
     * 获取所有发货商品
     */
    async listAll() {
        const all = await deliveryTable.where().find();
        return all;
    }

    /**
     * 更新发货状态
     */
    async updateTransport(id) {
        const item = await deliveryTable.where({ _id: ObjectId(id) }).findOne();
        Object.assign(item, { transport: true });
        await deliveryTable.save(item);
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
     * 写入地址
     * @param {string} userId 用户ID
     * @param {string} prizeId 奖品ID
     * @param {string} name 姓名
     * @param {string} phone 手机号
     * @param {string} address 地址
     */
    async address(body) {
        let prizeInfo = await prizeTable.where({ _id: ObjectId(body.prizeId) }).findOne();
        let requestBody = {
            ...body,
            transport: false, // 是否发货
            prizeName: prizeInfo.name, // 奖品名
        };
        return await deliveryTable.save(requestBody);
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
            let prize = prizeAll.find((prizeItem) => {
                return prizeItem._id.toString() == item.prizeId.toString();
            });
            item.image = prize.image;
        });

        return deliveryList;
    }
}

// 导出 Service 的实例
module.exports = new DeliveryService();
