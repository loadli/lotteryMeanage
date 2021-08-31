/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:28:58
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 09:51:35
 * @Description  : 前台接口
 * @FilePath     : \lotteryMeanage\server\koa\src\routers\client.js
 */
const Router = require("@koa/router");

// 路由前缀
const router = new Router({
    prefix: "/client",
});

//前台服务
const clientController = require("../controllers/clientController");

/*
 * 🌰举例： /list的接口地址：/client/list
 */

// 文档 => 1.1 抽奖列表
router.post("/list", clientController.list);

// 文档 => 1.2 矿石数量
router.post("/ore", clientController.ore);

// 文档 => 1.3 我的奖品
router.post("/my", clientController.my);

// 文档 => 1.4 抽奖纪录
router.post("/history", clientController.history);

// 文档 => 1.4 抽奖
router.post("/lottery", clientController.lottery);

// 文档 => 1.7 收获信息
router.post("/address", clientController.address);

module.exports = router.routes();
