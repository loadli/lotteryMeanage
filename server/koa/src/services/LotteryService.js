/*
 * @Author       : xiaolin
 * @Date         : 2021-09-05 01:10:47
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 14:09:10
 * @Description  : 抽奖相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\LotteryService.js
 */
const inspirecloud = require("@byteinspire/api");
const ObjectId     = inspirecloud.db.ObjectId;
const dateToString = inspirecloud.db.dateToString;

// ---------------------------------------------------
const PrizeService    = require("./PrizeService");     // 奖品
const UserService     = require("./UserService");      // 用户
const RecordService   = require("./RecordService");    // 历史纪录
const DeliveryService = require("./DeliveryService");  // 实物奖品
// ---------------------------------------------------

class LotteryService {
    /**
     * 抽奖结束，修改部分数值
     * @param {object} userid 用户id
     * @param {object} prize 奖品
     */
    async LotteryEnd(userid, prize) {
        // 减少商品库存
        await PrizeService.LotteryReamin(prize);
        console.log("库存减少成功");

        // 减少用户剩余矿石数
        await UserService.oreRemainLess(userid);
        console.log("矿石减少成功");

        // 抽中矿石增加66
        if (prize.name == "66矿石") {
            await UserService.oreRemainAdd(userid);
            console.log("矿石增加成功");
        }

        // 写入抽奖纪录
        await RecordService.LotteryRecord(userid, prize);
        console.log("抽奖纪录写入成功");

        // 更新数据获取不到id导致重复
        // if (prize.type == "02") {
        //     // 写入实物纪录
        //     await DeliveryService.LotteryDelivery(userid, prize);
        //     console.log("实物纪录写入成功");
        // }
    }
}

// 导出 Service 的实例
module.exports = new LotteryService();
