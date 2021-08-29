const recordTable = require('../models/recordTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * TodoService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class TodoService {
  /**
   * 列出所有待办事项
   * @return {Promise<>} 返回待办事项数组
   */
  async listAll(page, size) {
    const start = (page - 1) * size
    const end = start + (size - 1)
    if (Number.isNaN(start) || Number.isNaN(end)) {
      return {
        data: [],
        current: 1,
        pageSize: 20,
        total: 0,
        success: false,
      };
    }
    const all = await recordTable.where().skip(start).limit(end).find();
    const total = await recordTable.where().count();

    console.log(all, total)
    const listMsg = {
      data: all,
      current: page,
      pageSize: size,
      total: total,
      success: true,
    }
    return listMsg;
  }

  /**
   * 删除一条待办事项
   * @param id 待办事项的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await recordTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`todo:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 删除所有待办事项
   */
  async deleteAll() {
    await recordTable.where().delete();
  }

}

// 导出 Service 的实例
module.exports = new TodoService();
