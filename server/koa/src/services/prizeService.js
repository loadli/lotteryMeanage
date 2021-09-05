/*
 * @Author       : xiaolin
 * @Date         : 2021-09-04 23:21:37
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 01:44:02
 * @Description  : 奖品相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\prizeService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId     = inspirecloud.db.ObjectId;

// ---------------------------------------------------
const prizeTable = require("../models/prizeTable"); // 奖品表
// ---------------------------------------------------

/**
 * PrizeService
 */
class PrizeService {
    /**
     * 列出所有奖品
     * @return {Promise<>} 返回奖品数组
     */
    async listAll({ page, size, name, prizeRemain, prizeSum, type, probability, enableDatetime, enable }) {
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
        let obj = {
            name,
            prizeRemain,
            prizeSum,
            type,
            probability,
            enableDatetime,
            enable,
        };
        let trimObj = {};
        for (let key in obj) {
            if (obj[key] !== null || obj[key] !== undefined) {
                trimObj[key] = obj[key];
            }
        }
        const all = await prizeTable.where(trimObj).skip(start).limit(end).find();
        console.log(all);
        const total = await prizeTable.where().count();

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
     * 修改奖品
     */
    async modifyPrize(id, info) {
        const item = await prizeTable.where({ _id: ObjectId(id) }).findOne();
        for (let key in info) {
            item[key] = info[key];
        }
        const result = await prizeTable.save(item);
        return result;
    }

    /**
     * 删除一条奖品
     * @param id 奖品的 _id
     * 若不存在，则抛出 404 错误
     */
    async delete(id) {
        const result = await prizeTable.where({ _id: ObjectId(id) }).delete();
        if (result.deletedCount === 0) {
            const error = new Error(`record: ${id} not found`);
            error.status = 404;
            throw error;
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
     * 前台获取参与抽奖的奖品
     */
    async lottery() {
        const prizeList = await prizeTable
            .where(function () {
                const current = new Date();
                return this.enable && current >= new Date(this.enableDatetime);
            })
            .find();
        return prizeList;
    }
}

// 导出 Service 的实例
module.exports = new PrizeService();
