const recordTable = require('../models/recordTable');
const prizeTable = require('../models/prizeTable')
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * PrizeService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含奖品的增删改查功能
 */
class PrizeService {
  /**
   * 列出所有奖品
   * @return {Promise<>} 返回奖品数组
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
    const all = await prizeTable.where().skip(start).limit(end).find();
    const total = await prizeTable.where().count();

    const listMsg = {
      data: all,
      current: page,
      pageSize: size,
      total: total,
      success: true,
    }
    return listMsg;
  }

  async modifyPrize(id, info) {
    const item = await prizeTable.where({_id: ObjectId(id)}).findOne()
    for(let key in info) {
      item[key] = info[key]
    }
    console.log(item, info)
    const result = await prizeTable.save(item)
    return result;
  }

  /**
   * 删除一条奖品
   * @param id 奖品的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await prizeTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`record: ${id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

// 导出 Service 的实例
module.exports = new PrizeService();
