const userTable = require('../models/userTable');
const inspirecloud = require('@byteinspire/api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * UserService
 * 登陆、登出、获取用户信息的具体实现
 */
class UserService {
  async getUserInfo(id) {
    if (!id) return null;
    const user = await userTable.where({
      _id: ObjectId(id)
    }).findOne();
    return user;
  }
  async login(loginParam) {
    const { username, password } = loginParam;
    const user = await userTable.where({
      username,
      secret: password,
    }).findOne();

    return user;
  }
}

// 导出 Service 的实例
module.exports = new UserService();