const recordTable = require('../models/recordTable');
const prizeTable = require('../models/prizeTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * RecordService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class RecordService {
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
    const recordAll = await recordTable.where().skip(start).limit(end).find();
    const prizeAll = await prizeTable.where().find();
    const all = recordAll.map((item) => {
        const prize = prizeAll.find((prizeItem) => {
            return (prizeItem._id = item.prizeId);
        });
        return Object.assign(item, prize);
    });
    console.log(all);
    
    const total = await recordTable.where().count();

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
   * 删除一条历史纪录
   * @param id 历史纪录的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await recordTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount === 0) {
      const error = new Error(`record: ${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 删除所有历史纪录
   */
  async deleteAll() {
    await recordTable.where().delete();
  }

}

// 导出 Service 的实例
module.exports = new RecordService();
