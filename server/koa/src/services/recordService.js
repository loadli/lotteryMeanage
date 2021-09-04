/*
 * @Author       : xiaolin
 * @Date         : 2021-09-03 15:28:21
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 01:45:28
 * @Description  : 历史纪录相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\recordService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

// ---------------------------------------------------
// 历史纪录表
const recordTable = require("../models/recordTable");
// 奖品表
const prizeTable = require("../models/prizeTable");
// ---------------------------------------------------

// 矿石
const OreService = require("../services/OreService");

/**
 * RecordService
 */
class RecordService {
    async listAll(page, size) {
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
        const recordAll = await recordTable.where().skip(start).limit(end).find();
        const prizeAll = await prizeTable.where().find();
        const all = recordAll.map((item) => {
            const prize = prizeAll.find((prizeItem) => {
                return (prizeItem._id = item.prizeId);
            });
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
     * 抽奖结束，写入抽奖纪录
     * @param {object} prize 奖品
     */
    async LotteryRecord(userid, prize) {
        const oreUse = await OreService.oreUse();

        const remain = await OreService.oreRemain(userid);

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
