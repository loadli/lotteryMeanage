/*
 * @Author       : xiaolin
 * @Date         : 2021-09-05 01:10:47
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 17:09:22
 * @Description  : 抽奖相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\LotteryService.js
 */

const inspirecloud = require("@byteinspire/api");
const ObjectId     = inspirecloud.db.ObjectId;

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
        await PrizeService.reaminLess(prize);
        console.log(userid + "库存减少成功");

        // 减少用户剩余矿石数
        await UserService.userOreRemainLess(userid);
        console.log(userid + "矿石减少成功");

        // 抽中矿石增加66
        if (prize.name == "66矿石") {
            await UserService.userOreRemainAdd(userid);
            console.log(userid + "矿石增加成功");
        }

        // 写入抽奖纪录
        await RecordService.writeRecord(userid, prize);
        console.log(userid + "抽奖纪录写入成功");

        // 更新数据获取不到id导致重复
        // if (prize.type == "02") {
        //     // 写入实物纪录
        //     await DeliveryService.writeDelivery(userid, prize);
        //     console.log(userid + "实物纪录写入成功");
        // }
    }
}

// 导出 Service 的实例
module.exports = new LotteryService();
