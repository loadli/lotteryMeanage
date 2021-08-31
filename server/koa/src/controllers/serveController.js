/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 10:19:38
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 10:55:23
 * @Description  : 后台服务
 * @FilePath     : \lotteryMeanage\server\koa\src\controllers\serveController.js
 */

// 历史纪录
const recordService = require('../services/recordService');
const deliveryService = require('../services/deliveryService');
const baseSettingService = require('../services/baseSettingService');
const prizeService = require('../services/prizeService');

/**
 * serveController
 * 包含后台所有功能
 */
class serveController {
    /**
     * @description: 登录
     * @param {Object} ctx - 请求参数
     */
    async login(ctx) {}

    /**
     * @description: 基础设置
     * @param {Object} ctx - 请求参数
     */
    async baseConfig(ctx) {}

    /**
     * @description: 修改基础设置
     * @param {Object} ctx - 请求参数
     */
    async setBaseConfig(ctx) {}

    /**
     * @description: 读取抽奖纪录
     * @param {Object} ctx - 请求参数
     */
    async history(ctx) {}

    /**
     * @description: 读取发货纪录
     * @param {Object} ctx - 请求参数
     */
    async transport(ctx) {}

    /**
     * @description: 修改发货纪录
     * @param {Object} ctx - 请求参数
     */
    async setTransport(ctx) {}

    /************************************************************/
    /************************************************************/
    /************************************************************/
    // 抽奖记录-服务
    /************************************************************/
    /************************************************************/
    /************************************************************/
    /**
     * 列出所有待办事项
     * 响应格式
     * {
     *   list: [todo1, todo2]
     * }
     * @param ctx Koa 的上下文参数
     */
    async listAllRecord(ctx) {
        const page = ctx.request.query.current;
        const size = ctx.request.query.pageSize;
        const list = await recordService.listAll(page, size);
        ctx.body = {
            ...list
        };
    }

    /**
     * 删除一条待办事项
     * 响应格式
     * {
     *   ok: true
     * }
     * @param ctx Koa 的上下文参数
     */
    async deleteRecord(ctx) {
        await recordService.delete(ctx.params.id);
        ctx.body = {
            ok: true
        };
    }

    /**
     * 删除所有待办事项
     * 响应格式
     * {
     *   ok: true
     * }
     * @param ctx Koa 的上下文参数
     */
    async deleteAllRecord(ctx) {
        await recordService.deleteAll();
        ctx.body = {
            ok: true
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
    }

    /**
     * @description: 修改奖品可用状态
     * @param {Object} ctx - 请求参数
     */
    async setEnable(ctx) {
        const { _id } = ctx.request.body
        const info = {
            name: ctx.request.name,
            type: ctx.request.type,
            probability: ctx.request.probability,
            enableDatetime: ctx.request.enableDatetime,
            enable: ctx.request.enable,
            prizeSum: ctx.request.prizeSum,
            prizeRemain: ctx.request.prizeRemain,
            image: ctx.request.image,
        }
        await prizeService.modifyPrize(_id, info);
        ctx.body = {
            ok: true
        };
    }

}

module.exports = new serveController();