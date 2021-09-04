const adminTable = require("../models/adminTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;
const dateToString = inspirecloud.db.dateToString;

/**
 * adminService
 * 登陆、登出、获取用户信息的具体实现
 */
class adminService {
    async getUserInfo(id) {
        if (!id) return null;
        const user = await adminTable
            .where({
                _id: ObjectId(id),
            })
            .findOne();
        delete user.secret;
        delete user.updatedAt;
        delete user.createdAt;
        return user;
    }
    async login(loginParam) {
        const { username, password } = loginParam;
        const user = await adminTable
            .where({
                username,
                secret: password,
            })
            .findOne();
        delete user.secret;
        delete user.updatedAt;
        delete user.createdAt;
        return user;
    }
}

// 导出 Service 的实例
module.exports = new adminService();
