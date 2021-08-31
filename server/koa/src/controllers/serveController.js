/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 10:19:38
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 20:19:48
 * @Description  : 后台服务
 * @FilePath     : \lotteryMeanage\server\koa\src\controllers\serveController.js
 */

// 后台用户
const adminService = require("../services/adminService");
// 基础设置
const baseSettingService = require("../services/baseSettingService");
// 历史纪录
const recordService = require("../services/recordService");
// 发货纪录
const deliveryService = require("../services/deliveryService");
// 奖品
const prizeService = require("../services/prizeService");
const inspirecloud = require("@byteinspire/api");
const dateToString = inspirecloud.db.dateToString

/**
 * serveController
 * 包含后台所有功能
 */
class serveController {
    /**
     * @description: 登录
     * @param {Object} ctx - 请求参数
     */
    async login(ctx) {
        const { username, password } = ctx.request.body;
        const user = await adminService.login({ username, password });
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
        const oreInit = await baseSettingService.getOreInit();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: { ...oreInit },
        };
    }

    /**
     * @description: 读取矿石单次消耗
     * @param {Object} ctx - 请求参数
     */
    async getOreUse(ctx) {
        const oreUse = await baseSettingService.getOreUse();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: { ...oreUse },
        };
    }

    /**
     * @description: 写入矿石初始值
     * @param {Object} ctx - 请求参数
     */
    async setOreInit(ctx) {
        const oreInit = await baseSettingService.setOreInit();
        ctx.body = {
            code: "200",
            message: "修改成功",
            data: { ...oreInit },
        };
    }

    /**
     * @description: 写入矿石初始值
     * @param {Object} ctx - 请求参数
     */
    async setOreUse(ctx) {
        const oreUse = await baseSettingService.setOreUse();
        ctx.body = {
            code: "200",
            message: "修改成功",
            data: { ...oreUse },
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
        const list = await recordService.listAll(page, size);
        ctx.body = {
            ...list,
        };
    }
    async deleteRecord(ctx) {
        await recordService.delete(ctx.params.id);
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
        await deliveryService.listAll();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: {},
        };
    }

    /**
     * @description: 修改发货纪录
     * @param {Object} ctx - 请求参数
     */
    async setTransport(ctx) {
        await deliveryService.updateTransport();
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
        await prizeService.listAll();
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
        const prizeList = await prizeService.listAll(page, size);
        ctx.body = {
            code:"200",
            message:"请求成功",
            data: prizeList
        }
    }

    /**
     * @description: 修改奖品信息
     * @param {Object} ctx - 请求参数
     */
    async setPrize(ctx) {
        const { id } = ctx.request.body
        const info = {
            name: ctx.request.name,
            type: ctx.request.type,
            probability: ctx.request.probability,
            enableDatetime: ctx.request.enableDatetime,
            prizeSum: ctx.request.prizeSum,
            prizeRemain: ctx.request.prizeRemain,
            image: ctx.request.image,
        }
        await prizeService.modifyPrize(id, info);
        ctx.body = {
            code: "200",
            message: "更新成功",
        }
    }

    /**
     * @description: 修改奖品可用状态
     * @param {Object} ctx - 请求参数
     */
    async setEnable(ctx) {
        const { id } = ctx.request.body
        const info = {
            enableDatetime: dateToString({ format: "%Y-%m-%d", date: new Date() }),
            enable: ctx.request.enable,
        }
        await prizeService.modifyPrize(id, info);
        ctx.body = {
            code: "200",
            message: "更新成功",
        };
    }

}

module.exports = new serveController();
