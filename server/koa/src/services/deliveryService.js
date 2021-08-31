const recordTable = require("../models/recordTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

/**
 * DeliveryService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class DeliveryService {
    /**
     * 获取所有发货商品
     */
    async listAll() {}

    /**
     * 更新发货状态
     */
    async updateTransport() {}

}

// 导出 Service 的实例
module.exports = new DeliveryService();
