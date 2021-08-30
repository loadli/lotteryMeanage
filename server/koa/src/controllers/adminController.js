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

  async oreRemain(ctx) {
    const admin = await adminService.getUser();
    ctx.body = {
      code:"200",
      message:"请求成功",
      data: {
        number: admin.oreRemain
      }
    };
  }

  async myPrize(ctx) {
    const { userId } = ctx.request.body;
    const prizeRecordList = await adminService.myPrize(userId);
    console.log(prizeRecordList)
    ctx.body = {
        code:"200",
        message:"请求成功",
        data: prizeRecordList
    }
  }

  async history(ctx){
    const { userId } = ctx.request.body;
    const historyList = await adminService.history(userId);
    ctx.body = {
        code:"200",
        message:"请求成功",
        data: historyList
    }
  }

  async lottery(ctx){
    // const { userId } = ctx.request.body;
    const prizeList = await adminService.lottery();
    console.log(prizeList)
    // 抽奖算法
    ctx.body = {
        code:"200",
        message:"请求成功",
        data: prizeList
    }
  }

  async address(ctx){
    const { userId } = ctx.request.body;
    const { prizeId } = ctx.request.body;
    const addressList = await adminService.address(userId, prizeId);
    ctx.body = {
        code:"200",
        message:"请求成功",
        data: addressList
    }
  }
}

// 导出 Controller 的实例
module.exports = new adminController();
