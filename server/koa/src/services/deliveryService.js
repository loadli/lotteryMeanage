const deliveryTable = require("../models/deliveryTable");
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
    async listAll() {
        const all = await deliveryTable.where().find();
        return all;
    }

    /**
     * 更新发货状态
     */
    async updateTransport(id) {
        const item = await deliveryTable.where({ _id: ObjectId(id) }).findOne();
        Object.assign(item, { transport: true });
        await deliveryTable.save(item);
    }
}

// 导出 Service 的实例
module.exports = new DeliveryService();
