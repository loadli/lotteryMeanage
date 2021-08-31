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

/**
 * serveController
 * 包含后台所有功能
 */
class serveController {
    /**
     * @description: 登录
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async login(ctx) {}

    /**
     * @description: 基础设置
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async baseConfig(ctx) {}

    /**
     * @description: 修改基础设置
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async setBaseConfig(ctx) {}

    /**
     * @description: 读取抽奖纪录
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async history(ctx) {}

    /**
     * @description: 读取发货纪录
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async transport(ctx) {}

    /**
     * @description: 修改发货纪录
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async setTransport(ctx) {}

    /**
     * @description: 读取奖品信息
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async lottery(ctx) {}

    /**
     * @description: 修改奖品状态
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async setLottery(ctx) {}

    /**
     * @description: 修改奖品可用状态
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async setEnable(ctx) {}
}

module.exports = new clientController();
