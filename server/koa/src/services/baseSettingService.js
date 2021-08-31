const baseSettingTable = require("../models/baseSettingTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

/**
 * BaseSettingService
 */
class BaseSettingService {
    /**
     * 获取所有配置
     */
    async listAll() {}

    /**
     * 写入所有配置
     */
    async updateAll() {}
}

// 导出 Service 的实例
module.exports = new BaseSettingService();
