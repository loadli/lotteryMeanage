/*
 * @Author       : xiaolin
 * @Date         : 2021-09-05 00:47:13
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 01:41:49
 * @Description  : 矿石相关服务
 * @FilePath     : \lotteryMeanage\server\koa\src\services\oreService.js
 */

const inspirecloud = require("@byteinspire/api");

// ---------------------------------------------------
const baseSettingTable = require("../models/baseSettingTable"); // 基础设置表
// ---------------------------------------------------

/**
 * OreService
 */
class OreService {
    /**
     * 获取矿石初始值
     */
    async getOreInit() {
        const baseSetting = await baseSettingTable
            .where({
                key: "oreInit",
            })
            .findOne();
        return baseSetting.value;
    }
    /**
     * 获取单次消耗矿石
     */
    async getOreUse() {
        const baseSetting = await baseSettingTable
            .where({
                key: "oreUse",
            })
            .findOne();
        return baseSetting.value;
    }
    /**
     * 设置矿石初始值
     */
    async setOreInit(count) {
        const baseSetting = await baseSettingTable
            .where({
                key: "oreInit",
            })
            .findOne();
        baseSetting.value = count;
        await baseSettingTable.save(baseSetting);
        return baseSetting.value;
    }
    /**
     * 设置单次消耗矿石
     */
    async setOreUse(count) {
        const baseSetting = await baseSettingTable
            .where({
                key: "oreUse",
            })
            .findOne();
        baseSetting.value = count;
        await baseSettingTable.save(baseSetting);
        return baseSetting.value;
    }
}

// 导出 Service 的实例
module.exports = new OreService();
