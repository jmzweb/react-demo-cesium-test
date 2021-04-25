const {Admin, PassRouter} = require("../src/server/model")
const {istoken} = require("./utils/token")

let notCheck = []

async function getPassRouter(){
    let pass = await PassRouter.find({})
    notCheck = pass[0].router
}

/**
 * xxx.findOne(<conditions>, <projection>, <options>, <callback>)
 *
 * ========find one iphone adventures - iphone adventures ??=========
 * Adventure.findOne({type: "iphone"}, function(err, adventure){})
 *
 * ========same as above =========
 * Adventure.findOne({type: "iphone"}).exec(function(err, adventure){})
 *
 * ========select only the adventures name ==========
 * Adventure.findOne({type: "iphone"}, "name", function(err, adventure){})
 *
 * ========same as above =========
 * Adventure.findOne({type: "iphone"}, "name").exec(function(err, adventure){})
 *
 * ========specify options, in this case lean ==========
 * Adventure.findOne({type: "iphone"}, "name", {lean: true}, callback)
 *
 * ========same as above =========
 * Adventure.findOne({type: "iphone"}, "name", {lean: true}).exec(callback)
 *
 * ========chaining findOne queries (same as above)
 * Adventure.findOne({type: "iphone"}).select("name").lean().exec(callback)
 * */

function auth(){
    return async (ctx, next) => {
        await getPassRouter()
        if(ctx.path.indexOf('/manage') === -1) return await next()

        let router = ctx.path = ctx.path.replace("/manage", "")
        if (router.indexOf('.') !== -1) return await next()
        if (notCheck.indexOf(router) !== -1 || !notCheck.every((item) => router.indexOf(item) === -1 )) return await next()
        if(!ctx.headers.token){ return ctx.body = {code: 1100, message: "无效Token"} }
        let user = await istoken(ctx)
        if(!user){ return ctx.body = {code: 1100, message: "管理员不存在"} }
        let admin = await Admin.findOne({_id: user._id})
        const {power, superAdmin, effect} = admin
        if(!effect){ return ctx.body = {code: 1100, message: "用户无效"} }
        if(superAdmin){ return await next() }
        if(power.indexOf(ctx.headers.key) === -1){
            return ctx.body = {code: 1100, message: "对不起，您没有操作权限"}
        } else {
            return await next()
        }

    }
}

module.exports = auth