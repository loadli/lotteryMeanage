/*
 * @Author      : mujiao
 * @Date        : 2021-09-04 16: 04: 03
 * @LastEditTime : 2021-09-05 14:41:32
 * @LastEditors  : xiaolin
 * @Description : 接口管理
 * @FilePath     : \lotteryMeanage\client\vue\src\common\api.js
 */
import { $$axios } from "./utils.js";

const URL = {
    RECORD : "/user/history",       // 抽奖历史
    PRIZE  : "/user/my",            // 待发货奖品
    ORE    : "/user/ore",           // 剩余矿石
    USE    : "/serve/getOreUse",    // 单次消耗
    LOTTERY: "/user/lotteryList",   // 奖品
    ADDRESS: "/user/address",       // 提交地址
    RESULT : "/user/lottery",       // 抽奖结果
};

export default {
    //获取奖品记录
    getRecordList(options) {
        return $$axios({
            url : URL.RECORD,
            data: { userId: options.userId || "" },
        });
    },

    //获取待发货记录
    getPrizeList(options) {
        return $$axios({
            url : URL.PRIZE,
            data: { userId: options.userId || "" },
        });
    },

    //获取用户矿石数量
    getOreNumber(options) {
        return $$axios({
            url : URL.ORE,
            data: { userId: options.userId || "" },
        });
    },

    //获取矿石单次消耗数
    getOreUseNumber() {
        return $$axios({
            url   : URL.USE,
            method: "get",
            data  : {},
        });
    },

    //获取奖品列表
    getLotteryList() {
        return $$axios({
            url   : URL.LOTTERY,
            method: "get",
            data  : {},
        });
    },

    //提交收获地址
    submitAddress(options) {
        return $$axios({
            url : URL.ADDRESS,
            data: options || {},
        });
    },

    //抽奖结果
    lotteryResult(options) {
        return $$axios({
            url : URL.RESULT,
            data: { userId: options.userId || "" },
        });
    },
};
