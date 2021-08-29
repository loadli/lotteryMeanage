const recordService = require('../services/recordService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class recordController {
  /**
   * 列出所有待办事项
   * 响应格式
   * {
   *   list: [todo1, todo2]
   * }
   * @param ctx Koa 的上下文参数
   */
  async listAll(ctx) {
    const page = ctx.request.query.current;
    const size = ctx.request.query.pageSize;
    const list = await recordService.listAll(page, size);
    ctx.body = {...list};
  }

  /**
   * 删除一条待办事项
   * 响应格式
   * {
   *   ok: true
   * }
   * @param ctx Koa 的上下文参数
   */
  async delete(ctx) {
    await recordService.delete(ctx.params.id);
    ctx.body = {ok: true};
  }

  /**
   * 删除所有待办事项
   * 响应格式
   * {
   *   ok: true
   * }
   * @param ctx Koa 的上下文参数
   */
  async deleteAll(ctx) {
    await recordService.deleteAll();
    ctx.body = {ok: true};
  }

}

// 导出 Controller 的实例
module.exports = new recordController();
