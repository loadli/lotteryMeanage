const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = new Router({
  prefix: '/user'
});

const adminController = require('../controllers/adminController');

// 组装路由
router.get('/', adminController.user);
router.get('/ore', adminController.oreRemain);
router.get('/my', adminController.myPrize);
router.get('/history', adminController.history);
router.get('/lottery', adminController.lottery);
router.get('/address', adminController.address);

// Koa 的路由需要调用 routes 函数获取实际用于 use 的函数
module.exports = router.routes();
