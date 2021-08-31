// 使用 inspirecloud 调用轻服务功能
const inspirecloud = require("@byteinspire/api");

// 使用轻服务 _user 表
const adminTable = inspirecloud.db.table("_user");

module.exports = adminTable;
