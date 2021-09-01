/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 09:28:58
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-01 22:28:18
 * @Description  : 前台接口
 * @FilePath     : \lotteryMeanage\server\koa\src\routers\client.js
 */
const Router = require("@koa/router");

// 路由前缀
const router = new Router({
    prefix: "/user",
});

//前台服务
const clientController = require("../controllers/clientController");

/*
 * 🌰举例： /list的接口地址：/user/list
 */

// 文档 => 1.1 抽奖列表
// router.post("/list", clientController.list);

// 文档 => 1.2 矿石数量
router.post("/ore", clientController.oreRemain);

// 文档 => 1.3 我的奖品
router.post("/my", clientController.myPrize);

// 文档 => 1.4 抽奖纪录
router.post("/history", clientController.history);

// 文档 => 1.4 抽奖
router.get("/lottery", clientController.lottery);

// 文档 => 1.7 收获信息
router.get("/address", clientController.address);

// 文档 => 1.8 创建用户
router.get("/create", clientController.create);

module.exports = router.routes();
