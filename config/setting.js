/**
 *
 * @param router 初始化不检测权限路由
 * @param updateRouter 是否更新数据库不检测权限路由
 * @param alias admin webpack alias
 * @param baseURL admin 基础请求 url
 * @param clientUrl 前端地址 展示在管理界面首页
 *
 * */

module.exports = {
    admin: {
        router: ["/login"],
        updateRouter: false,
        alias: {},
        // http://127.0.0.1:  +  (process.env.PORT || 8080)
        baseURL: "",
        github: "",
        clientUrl: ""
    },
    server: {
        // 设置生产环境下是否允许跨域
        cors: false,
        mailInfo: {
            user: "",
            pass: "",
            host: ""
        }
    }
}