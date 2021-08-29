const adminService = require('../services/adminService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class adminController {
  /**
   * 列出所有待办事项
   * 响应格式
   * {
   *   list: [todo1, todo2]
   * }
   * @param ctx Koa 的上下文参数
   */
  async user(ctx) {
    const admin = await adminService.getUser();
    ctx.body = {...admin};
  }
}

// 导出 Controller 的实例
module.exports = new adminController();
