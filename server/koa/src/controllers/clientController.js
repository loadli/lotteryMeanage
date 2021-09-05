/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:37:11
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 17:43:22
 * @Description  : 前台服务
 * @FilePath     : \lotteryMeanage\server\koa\src\controllers\clientController.js
 */


const UserService     = require("../services/UserService");      // 用户
const OreService      = require("../services/OreService");       // 矿石
const PrizeService    = require("../services/PrizeService");     // 奖品
const RecordService   = require("../services/RecordService");    // 历史
const DeliveryService = require("../services/DeliveryService");  // 实物
const LotteryService  = require("../services/LotteryService");   // 抽奖

/**
 * clientController
 * 包含前台所有功能
 */
class clientController {
    /**
     * 创建用户
     */
    async create(ctx) {
        const user = await UserService.createUser();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: {
                id: user._id,
            },
        };
    }

    /**
     * 剩余矿石
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async oreRemain(ctx) {
        const { userId } = ctx.request.body;
        const user = await UserService.userOreRemain(userId);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: {
                number: user.oreRemain,
            },
        };
    }

    /**
     * 奖品列表
     * @return {Array}
     */
    async lotteryList(ctx) {
        const lotteryList = await PrizeService.clientList();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: lotteryList,
        };
    }

    /**
     * 我的奖品
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async myPrize(ctx) {
        const { userId } = ctx.request.body;
        const prizeRecordList = await DeliveryService.listById(userId);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: prizeRecordList,
        };
    }

    /**
     * 抽奖纪录
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async listByUser(ctx) {
        const { userId } = ctx.request.body;
        const historyList = await RecordService.listByUser(userId);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: historyList,
        };
    }

    /**
     * @description: 抽奖
     * @param {Object} ctx - 请求参数
     */
    async lottery(ctx) {
        const { userId } = ctx.request.body;

        const user = await UserService.userOreRemain(userId);
        const oreUse = await OreService.getOreUse();

        if (user.oreRemain < oreUse) {
            ctx.body = {
                code: "300",
                message: "矿石不足",
                data: null,
            };
            return;
        }

        const prizeList = await PrizeService.lotteryUsable();
        // 抽奖算法
        let probablySum = prizeList.reduce((sum, item) => (sum += Number(item.probability)), 0);
        let prize = null;
        const probabilityList = prizeList.map((item) => item.probability);
        for (let i = 0; i < probabilityList.length; i++) {
            const random = Math.random() * probablySum;
            if (random < probabilityList[i]) {
                prize = prizeList[i];
            } else {
                probablySum -= probabilityList[i];
            }
        }
        console.log("本次抽中 :" + prize._id + " " + prize.name);
        if (prize) {
            await LotteryService.LotteryEnd(userId, prize);
            console.log("剩余矿石" + user.oreRemain);
            ctx.body = {
                code: "200",
                message: "请求成功",
                data: Object.assign(prize),
            };
        } else {
            ctx.body = {
                code: "300",
                message: "无可用奖品",
                data: null,
            };
        }
    }

    /**
     * @description: 收货信息
     * @param {Object} ctx - 请求参数
     */
    async address(ctx) {
        const { userId, name, prizeId, phone, address } = ctx.request.body;
        const data = {
            userId,
            name,
            prizeId,
            phone,
            address,
        };
        const addressList = await DeliveryService.writeAddress(data);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: addressList,
        };
    }
}

module.exports = new clientController();
