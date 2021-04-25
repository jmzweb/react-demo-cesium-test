const Router = require("koa-router")
const controller = require("../controllers")

const router = new Router({
  prefix: "/"
})

const {Admin} = controller

router
  .get("login", Admin.login)

module.exports = router
