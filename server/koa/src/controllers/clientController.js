/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:37:11
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-02 14:55:30
 * @Description  : 前台服务
 * @FilePath     : \lotteryMeanage\server\koa\src\controllers\clientController.js
 */

// 前台业务逻辑
const clientService = require("../services/clientService");

/**
 * clientController
 * 包含前台所有功能
 */
class clientController {
    /**
     * 获取用户
     */

    async user(ctx) {
        const user = await clientService.getUser();
        ctx.body = {
            ...user,
        };
    }

    /**
     * 创建用户
     */
    async create(ctx) {
        const user = await clientService.createUser();
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
        const user = await clientService.oreRemain(userId);
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
        const lotteryList = await clientService.lottery();
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
        const prizeRecordList = await clientService.myPrize(userId);
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
    async history(ctx) {
        const { userId } = ctx.request.body;
        const historyList = await clientService.history(userId);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: historyList,
        };
    }

    /**
     * 奖品信息
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async prizeInfo(ctx) {
        const { _id } = ctx.request.body;
        const prizeInfoList = await clientService.prizeInfo(_id);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: prizeInfoList,
        };
    }

    /**
     * @description: 抽奖
     * @param {Object} ctx - 请求参数
     */
    async lottery(ctx) {
        const { userId } = ctx.request.body;

        const user = await clientService.oreRemain(userId);
        const oreUse = await clientService.oreUse();

        if (user.oreRemain < oreUse) {
            ctx.body = {
                code: "300",
                message: "矿石不足",
                data: null,
            };
            return;
        }

        const prizeList = await clientService.lottery();
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
        console.log("本次抽中 --------------------------------");
        console.log(prize);
        console.log("----------------------------------------");
        if (prize) {
            await clientService.LotteryEnd(userId, prize);
            console.log("------------------------------");
            console.log("剩余矿石" + user.oreRemain);
            console.log("-------------------------------");
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
        const addressList = await clientService.address(data);
        console.log("addressList", addressList);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: addressList,
        };
    }
}

module.exports = new clientController();
