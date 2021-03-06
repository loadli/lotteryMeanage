const path = require("path");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const koaCompose = require("koa-compose");
const koaCors = require("koa-cors");
const Koa = require("koa");
const app = new Koa();

// 自定义路由
// --------------------------------------------------
// const todoRouter = require("./routers/todo");
// const userRouter = require("./routers/user");
// const recordRouter = require("./routers/record");
const clientRouter = require("./routers/client");
const serveRouter = require("./routers/serve");
// --------------------------------------------------

// 为应用使用中间件
// 静态文件中间件
app.use(koaStatic(path.join(__dirname, "../public")));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(koaBody());

// 跨域设置
app.use(
    koaCors({
        origin: "*",
        methods: "GET,POST",
    })
);

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (err) {
        // 抛出的错误可以附带 status 字段，代表 http 状态码
        // 若没有提供，则默认状态码为 500，代表服务器内部错误
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
});

// 为应用使用路由定义
// 使用待办事项业务路由
// app.use(todoRouter);
app.use(koaCompose([clientRouter, serveRouter]));

module.exports = app;
