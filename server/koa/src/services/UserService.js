/*
 * @Author       : xiaolin
 * @Date         : 2021-09-05 00:51:44
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 01:47:18
 * @Description  : 前台用户相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\userService.js
 */
const inspirecloud = require("@byteinspire/api");

// ---------------------------------------------------
// 基础设置表
const baseSettingTable = require("../models/baseSettingTable");
// 用户表
const userTable = require("../models/userTable");
// ---------------------------------------------------

/**
 * UserService
 */
class UserService {
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
        console.log("用户：" + userid + "剩余" + user.oreRemain);
        await userTable.save(user);
        return user;
    }
}

// 导出 Service 的实例
module.exports = new UserService();
