/**
 * nodemon => 文件改变 ，目录被检测到。
 * */

const Koa = require("koa")
const koaBody = require("koa-body")
const serve = require("koa-static")
const path = require("path")
const router = require("./src/server/router/router")
const schedule = require("node-schedule")
const error = require("./middleware/error")

const morgan = require("koa-morgan")

const corsl = require("./middleware/cors")

const authentication = require("./middleware/auth")





/**
 * schedule.sheduleJob(" 1* 2* 3* 4* 5* 6* ", function(){})
 * 1* => second(0 - 59, OPTIONAL)
 * 2* => minute(0 -59)
 * 3* => hour(0 - 23)
 * 4* => day of month (1 -31)
 * 5* => month (1 - 12)
 * 6* => day of week (0 -7) (0 or 7 is Sun)
 *
 * */

var app = new Koa();

require("./middleware/mongodb")(app)
require("./middleware/init")(app)


require("./build/dev-server")(app)

// if( process.env.SERVER === 'false' ){
//     require("build/dev-server")(app)
// }

schedule.scheduleJob("0 50 11 * * 7", function(){
    require("./middleware/backup")()
})

app
    .use(koaBody())
    .use(error())
    .use(morgan(' ":method :url" :status :res[content-length] ":referrer" ":user-agent" ')) // 请求日志
    .use(corsl(app))
    .use(authentication())
    // .use(morgan("combined", {stream: fs.createWriteStream(__dirname+"/access.log",{flags: "a"})}))
    .use(serve(path.join(__dirname, "/static")))
    .use(router.routes())

app.listen(9091, function(){
  console.log('start in http://localhost:9091')
})
