/*
 * @Author       : xiaolin
 * @Date         : 2021-09-04 23:21:37
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 11:01:53
 * @Description  : 管理员相关
 * @FilePath     : \lotteryMeanage\server\koa\src\services\AdminService.js
 */

const inspirecloud = require("@byteinspire/api");

// ---------------------------------------------------
// 管理用户表
const adminTable = require("../models/adminTable");
// ---------------------------------------------------
const ObjectId     = inspirecloud.db.ObjectId;
const dateToString = inspirecloud.db.dateToString;

/**
 * AdminService
 */
class AdminService {
    /**
     * 登录
     */
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
    /**
     * 获取用户信息
     */
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
}

// 导出 Service 的实例
module.exports = new AdminService();
