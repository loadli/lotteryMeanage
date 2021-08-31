/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 10:19:38
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 17:29:27
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
     * @description: 基础设置
     * @param {Object} ctx - 请求参数
     */
    async baseConfig(ctx) {
        const config = await baseSettingService.listAll();
        ctx.body = {
            code: "200",
            message: "请求成功",
            data: {},
        };
    }

    /**
     * @description: 修改基础设置
     * @param {Object} ctx - 请求参数
     */
    async setBaseConfig(ctx) {
        await baseSettingService.updateAll();
        ctx.body = {
            code: "200",
            message: "修改成功",
            data: {},
        };
    }

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
    /**
     * @description: 删除抽奖纪录
     * @param {Object} ctx - 请求参数
     */
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

    /**
     * @description: 修改奖品状态
     * @param {Object} ctx - 请求参数
     */
    async setLottery(ctx) {
        await prizeService.updateLottery();
        ctx.body = {
            code: "200",
            message: "更新成功",
            data: {},
        };
    }

    /**
     * @description: 修改奖品可用状态
     * @param {Object} ctx - 请求参数
     */
    async setEnable(ctx) {
        await prizeService.updateLotteryEnable();
        ctx.body = {
            code: "200",
            message: "更新成功",
            data: {},
        };
    }
}

module.exports = new serveController();
