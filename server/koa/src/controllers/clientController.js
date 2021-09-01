/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:37:11
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 23:19:08
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
        // const { userId } = ctx.request.body;
        const prizeList = await clientService.lottery();
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
        if (prize) {
            // 抽奖算法
            ctx.body = {
                code: "200",
                message: "请求成功",
                data: prize,
            };
            await clientService.LotteryEnd(prize);
        } else {
            ctx.body = {
                code: "200",
                message: "请求成功",
                data: null,
            };
        }
    }

    /**
     * @description: 收获信息
     * @param {Object} ctx - 请求参数
     */
    async address(ctx) {
        const { userId } = ctx.request.body;
        const { prizeId } = ctx.request.body;
        const addressList = await clientService.address(userId, prizeId);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: addressList,
        };
    }
}

module.exports = new clientController();
