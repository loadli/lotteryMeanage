const prizeTable = require("../models/prizeTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

/**
 * PrizeService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class PrizeService {
    /**
     * 获取所有奖品
     */
    async listAll() {}

    /**
     * 更新单个奖品
     */
    async updateLottery() {}
    /**
     * 更新单个奖品
     */
    async updateLottery() {}

    /**
     * 更新奖品可用状态
     */
    async updateLotteryEnable(){}
}

// 导出 Service 的实例
module.exports = new PrizeService();
