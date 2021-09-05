/*
 * @Author       : xiaolin
 * @Date         : 2021-09-03 15:28:21
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 20:47:03
 * @Description  : 历史纪录相关
 * @FilePath: /lotteryMeanage/server/koa/src/services/RecordService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

// ---------------------------------------------------
const recordTable = require("../models/recordTable");  // 历史纪录表
const prizeTable = require("../models/prizeTable");   // 奖品表
// ---------------------------------------------------

/**
 * 引用service
 * ---------------------------------------------------
 */
const OreService = require("./OreService");      // 矿石
const UserService = require("./UserService");     // 用户
/**
 * ---------------------------------------------------
 */

class RecordService {
    async listAll({
        page,
        size,
        name,
        userId
    }) {
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
        let recordQuery = {}
        let prizeQuery = {}
        if (userId) {
            recordQuery.userId = userId
        }
        if (name) {
            prizeQuery.name = name
        }
        // console.log('########################### recordQuery, prizeQuery')
        // console.log(recordQuery, prizeQuery)
        // console.log('########################### recordQuery, prizeQuery')
        const recordAll = await recordTable.where(recordQuery).skip(start).limit(end).find();
        const prizeAll = await prizeTable.where(prizeQuery).find();
        const all = recordAll.map((item) => {
            const prize = prizeAll.find((prizeItem) => {
                return (prizeItem._id = item.prizeId);
            });
            delete prize._id;
            return Object.assign(item, prize);
        });

        const total = await recordTable.where().count();

        const listMsg = {
            data: all,
            current: page,
            pageSize: size,
            total: total,
            success: true,
        };
        return listMsg;
    }

    /**
     * 删除一条历史纪录
     * @param id 历史纪录的 _id
     * 若不存在，则抛出 404 错误
     */
    async delete(id) {
        const result = await recordTable.where({ _id: ObjectId(id) }).delete();
        if (result.deletedCount === 0) {
            const error = new Error(`record: ${id} not found`);
            error.status = 404;
            throw error;
        }
    }

    /**
     * 删除所有历史纪录
     */
    async deleteAll() {
        await recordTable.where().delete();
    }

    /**
     * 前台获取历史纪录
     */
    async listByUser(userId) {
        if (!userId) {
            return [];
        }
        let recordList = await recordTable
            .where({
                userId,
            })
            .find();

        return recordList;
    }

    /**
     * 抽奖结束，写入抽奖纪录
     * @param {object} prize 奖品
     */
    async writeRecord(userid, prize) {
        const oreUse = await OreService.getOreUse();

        const remain = await UserService.userOreRemain(userid);

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
}

// 导出 Service 的实例
module.exports = new RecordService();
