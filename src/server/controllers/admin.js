const {Admin} = require("../model")

exports.login = async (ctx , next) => {
  const {username, password} = ctx.request.body
  let user = await Admin.find({username, password})
  console.log(1, user)
  ctx.body = "001"
}
