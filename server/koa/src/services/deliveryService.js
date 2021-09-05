/*
 * @Author       : xiaolin
 * @Date         : 2021-09-03 15:28:21
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 21:51:15
 * @Description  : 实物相关
 * @FilePath: /lotteryMeanage/server/koa/src/services/deliveryService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

// ---------------------------------------------------
const deliveryTable = require("../models/deliveryTable");  // 实物表
const prizeTable = require("../models/prizeTable");     // 奖品表
// ---------------------------------------------------

class DeliveryService {
    /**
     * 获取所有发货商品
     */
    async listAll({ page, size, transport }) {
        const start = (page - 1) * size;
        const end = start + (size - 1);
        if (Number.isNaN(start) || Number.isNaN(end)) {
            return {
                data: [],
                current: 1,
                pageSize: 20,
                total: 0,
                success: false,
            };
        }
        const query = {};
        if (transport === '1') {
            query.transport = true;
        } else if (transport === '2') {
            query.transport = false;
        }
        const all = await deliveryTable.where(query).skip(start).limit(end).find();
        return {
            data: all,
            current: page,
            pageSize: size,
            total: await deliveryTable.where().count(),
            success: true,
        };
    }

    /**
     * 更新发货状态
     */
    async modifyTransportById(id) {
        const item = await deliveryTable.where({ _id: ObjectId(id) }).findOne();
        Object.assign(item, { transport: true });
        await deliveryTable.save(item);
    }

    /**
     * 抽奖结束，写入实物纪录
     * @param {object} userid 奖品
     * @param {object} prize 奖品
     */
    async writeDelivery(userid, prize) {
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
    async writeAddress(body) {
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
    async listById(userId) {
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
