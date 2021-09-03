// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/api");

// 使用轻服务 base_setting 表
const recordTable = inspirecloud.db.table("base_setting");

// 导出 table 实例
module.exports = recordTable;
