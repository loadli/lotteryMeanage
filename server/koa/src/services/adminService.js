const adminTable = require('../models/adminTable');
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

}

// 导出 Service 的实例
module.exports = new AdminService();
