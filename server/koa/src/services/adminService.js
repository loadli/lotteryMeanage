const adminTable = require('../models/adminTable');
const recordTable = require('../models/recordTable');
const prizeTable = require('../models/prizeTable');
const inspirecloud = require('@byteinspire/api');
const { use } = require('../app');
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
    const adminList = await adminTable.where().find();
    const admin = {
        oreRemain: adminList[0].oreRemain
    };
    return admin;
  }

  async myPrize(userId) {
    if (!userId) {
      return []
    }
    const prizeRecordList = await recordTable.where({
      userId
    }).find()
    return prizeRecordList
  }

  async history(userId) {
    if (!userId) {
      return []
    }
    const prizeRecordList = await recordTable.where({
      userId
    }).find()
    return prizeRecordList
  }
  async lottery() {
    const prizeList = await prizeTable.where(function(){
      return this.prizeRemain > 0
    }).find()
    return prizeList;
  }
  async LotteryEnd(prize) {
    const prizeData = await prizeTable.where({
      _id: prize._id
    }).findOne()
    prizeData.prizeRemain--
    await prizeTable.save(prizeData)
    return prizeData;
  }
  async address(userId, prizeId) {
    if (!userId) {
      return []
    }
    const prizeRecordList = await recordTable.where({
      userId,
      prizeId
    }).find()
    return prizeRecordList
  }



}

// 导出 Service 的实例
module.exports = new AdminService();
