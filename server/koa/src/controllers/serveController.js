/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 10:19:38
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 02:19:31
 * @Description  : 后台服务
 * @FilePath     : \lotteryMeanage\server\koa\src\controllers\serveController.js
 */

const inspirecloud = require("@byteinspire/api");
const dateToString = inspirecloud.db.dateToString;

// 后台用户
const AdminService = require("../services/AdminService");
// 矿石
const OreService = require("../services/OreService");
// 历史纪录
const RecordService = require("../services/RecordService");
// 发货纪录
const DeliveryService = require("../services/DeliveryService");
// 奖品
const PrizeService = require("../services/PrizeService");

/**
 * serveController
 * 包含后台所有功能
 */
class serveController {
    /**
     * @description: 获取用户信息
     * @param {Object} ctx - 请求参数
     */
    async getUser(ctx) {
        const { userid } = ctx.request.query;
        const user = await AdminService.getUserInfo(userid);
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: user,
        };
    }

    /**
     * @description: 登录
     * @param {Object} ctx - 请求参数
     */
    async login(ctx) {
        const { username, password } = ctx.request.query;
        const user = await AdminService.login({ username, password });
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: user,
        };
    }

    /**
     * @description: 读取矿石初始值
     * @param {Object} ctx - 请求参数
     */
    async getOreInit(ctx) {
        const oreInit = await OreService.getOreInit();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: { oreInit },
        };
    }

    /**
     * @description: 读取矿石单次消耗
     * @param {Object} ctx - 请求参数
     */
    async getOreUse(ctx) {
        const oreUse = await OreService.getOreUse();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: { oreUse },
        };
    }

    /**
     * @description: 写入矿石初始值
     * @param {Object} ctx - 请求参数
     */
    async setOreInit(ctx) {
        const { count } = ctx.request.body;
        const oreInit = await OreService.setOreInit(count);
        ctx.body = {
            code: "200",
            message: "修改成功",
            data: { oreInit },
        };
    }

    /**
     * @description: 写入矿石初始值
     * @param {Object} ctx - 请求参数
     */
    async setOreUse(ctx) {
        const { count } = ctx.request.body;
        const oreUse = await OreService.setOreUse(count);
        ctx.body = {
            code: "200",
            message: "修改成功",
            data: { oreUse },
        };
    }

    /************************************************************/
    /************************************************************/
    /************************************************************/
    // 抽奖记录-服务
    /************************************************************/
    /************************************************************/
    /************************************************************/
    /**
     * @description: 读取抽奖纪录
     * @param {Object} ctx - 请求参数
     * 响应格式
     * {
     *   list: [todo1, todo2]
     * }
     */
    async listAllRecord(ctx) {
        const page = ctx.request.query.current;
        const size = ctx.request.query.pageSize;
        const name = ctx.request.query.name;
        const userId = ctx.request.query.userId;
        const list = await RecordService.listAll({
            page,
            size,
            name,
            userId
        });

        ctx.body = {
            ...list,
        };
    }
    async deleteRecord(ctx) {
        await RecordService.delete(ctx.params.id);
        ctx.body = {
            code: "200",
            message: "删除成功",
            data: {},
        };
    }
    /**
     * @description: 读取发货纪录
     * @param {Object} ctx - 请求参数
     */
    async transport(ctx) {
        const list = await DeliveryService.listAll();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: list,
        };
    }

    /**
     * @description: 修改发货纪录
     * @param {Object} ctx - 请求参数
     */
    async setTransport(ctx) {
        console.log(ctx, "这是ctx");
        const { id } = ctx.request.body;
        await DeliveryService.updateTransport(id);
        ctx.body = {
            code: "200",
            message: "更新成功",
            data: {},
        };
    }

    /**
     * @description: 读取奖品信息
     * @param {Object} ctx - 请求参数
     */
    async lottery(ctx) {
        await PrizeService.listAll();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: {},
        };
    }

    /************************************************************/
    /************************************************************/
    /************************************************************/
    // 奖品信息-服务
    /************************************************************/
    /************************************************************/
    /************************************************************/
    /**
     * @description: 读取奖品信息
     * @param {Object} ctx - 请求参数
     */
    async prizeList(ctx) {
        const page = ctx.request.query.current;
        const size = ctx.request.query.pageSize;
        const name = ctx.request.query.name;
        const prizeRemain = ctx.request.query.prizeRemain;
        const prizeSum = ctx.request.query.prizeSum;
        const type = ctx.request.query.type;
        const probability = ctx.request.query.probability;
        const enableDatetime = ctx.request.query.enableDatetime;
        const enable = ctx.request.query.enable;
        const prizeList = await PrizeService.listAll({
            page,
            size,
            name,
            prizeRemain,
            prizeSum,
            type,
            probability,
            enableDatetime,
            enable,
        });
        ctx.body = {
            //   code: "200",
            //   message: "请求成功",
            ...prizeList,
        };
    }

    /**
     * @description: 修改奖品信息
     * @param {Object} ctx - 请求参数
     */
    async setPrize(ctx) {
        const { id } = ctx.request.body;
        const info = {
            name: ctx.request.body.name,
            type: ctx.request.body.type,
            probability: ctx.request.body.probability,
            enableDatetime: ctx.request.body.enableDatetime,
            prizeSum: ctx.request.body.prizeSum,
            prizeRemain: ctx.request.body.prizeRemain,
            image: ctx.request.body.image,
        };
        await PrizeService.modifyPrize(id, info);
        ctx.body = {
            code: "200",
            message: "更新成功",
        };
    }

    /**
     * @description: 修改奖品可用状态
     * @param {Object} ctx - 请求参数
     */
    async setEnable(ctx) {
        const { _id, enable } = ctx.request.query;

        const info = {
            enable: enable,
        };
        await PrizeService.modifyPrize(_id, info);
        ctx.body = {
            code: "200",
            message: "更新成功",
        };
    }
}

module.exports = new serveController();
