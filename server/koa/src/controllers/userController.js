const userService = require('../services/userService');

/**
 * UserController 
 * 包含用户登陆，用户信息获取等功能
 */
class UserController {
  /**
   * 获取用户信息
   */
  async getUserInfo(ctx) {
    const { id } = ctx.request.query;
    const user = await userService.getUserInfo(id);

    ctx.body = { data: user };
  }
  /**
   * 登陆
   */
  async login(ctx) {
    const { username, password } = ctx.request.body;
    const user = await userService.login({ username, password });
    ctx.body = { data: user };
  }
}

module.exports = new UserController();