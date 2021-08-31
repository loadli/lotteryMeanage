/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:37:11
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 09:50:08
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
     * @description: 抽奖列表
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async list(ctx) {}

    /**
     * @description: 矿石数量
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async ore(ctx) {}

    /**
     * @description: 我的奖品
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async my(ctx) {}

    /**
     * @description: 抽奖纪录
     * @param {Object} ctx - 请求参数
     * @return {Array}
     */
    async history(ctx) {}

    /**
     * @description: 抽奖
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async lottery(ctx) {}

    /**
     * @description: 收获信息
     * @param {Object} ctx - 请求参数
     * @return {Object}
     */
    async address(ctx) {}
}

module.exports = new clientController();
