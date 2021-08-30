const adminTable = require('../models/adminTable');
const recordTable = require('../models/recordTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * AdminService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class AdminService {
  /**
   * 列出所有待办事项
   * @return {Promise<>} 返回待办事项数组
   */
  async getUser() {
    const adminList = await adminTable.where();
    const admin = {
        oreRemain: adminList[0].oreRemain
    };
    return admin;
  }

  async myPrize(userId) {
    const prizeRecordList = await recordTable.where({
      userId
    })
    return prizeRecordList
  }

  async history(userId) {
    const prizeRecordList = await recordTable.where({
      userId
    })
    return prizeRecordList
  }
  async lottery(userId) {
    const prizeRecordList = await recordTable.where({
      userId
    })
    return prizeRecordList
  }
  async address(userId, prizeId) {
    const prizeRecordList = await recordTable.where({
      userId,
      prizeId
    })
    return prizeRecordList
  }



}

// 导出 Service 的实例
module.exports = new AdminService();
