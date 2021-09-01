/*
 * @Author       : xiaolin
 * @Date         : 2021-08-31 10:09:44
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 19:55:56
 * @Description  : 后台路由
 * @FilePath     : \lotteryMeanage\server\koa\src\routers\serve.js
 */
const Router = require("@koa/router");

// 路由前缀
const router = new Router({
    prefix: "/serve",
});

//后台服务
const serveController = require("../controllers/serveController");

/*
 * 🌰举例： /list的接口地址：/serve/list
 */

// 文档 => 2.1 登录
router.get("/login", serveController.login);

// 文档 => 2.2 基础设置
router.get("/getOreInit", serveController.getOreInit);
router.get("/getOreUse", serveController.getOreUse);

// 文档 => 2.3 修改基础设置
router.post("/setOreInit", serveController.setOreInit);
router.post("/setOreUse", serveController.setOreUse);

// 文档 => 2.4 读取抽奖纪录
router.get("/list", serveController.listAllRecord);
// 删除抽奖记录
router.post("/delete", serveController.deleteRecord);

// 文档 => 2.5 读取发货纪录
router.get("/transport", serveController.transport);

// 文档 => 2.6 修改发货纪录
router.post("/setTransport", serveController.setTransport);

// 文档 => 2.7 读取奖品信息
router.get("/prizeList", serveController.prizeList);

// 文档 => 2.8 修改奖品状态
router.post("/setLottery", serveController.setPrize);

// 文档 => 2.9 修改奖品可用状态
router.post("/setEnable", serveController.setEnable);

module.exports = router.routes();
