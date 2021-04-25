/**
 * CORS 资源共享
 * */
const {server} = require("../config/setting")
const cors = require("koa-cors") // CORS middleware for Koa

let options = {
    origin: "*",  //Access-Control-Allow-Origin
    expose:"",    // Access-Control-Expose-Headers
    maxAge:"",    // Access-Control-Max-Age
    credentials: false, // Access-Control-Allow-Credentials
    methods: "",  // Access-Control-Allow-Methods
    headers:"",   //access-control-request-headers
}

function corsl(app){
    return async (ctx, next) => {
        if(process.env.NODE_ENV === "development" || server.cors){
            app.use(cors())
            // app.use(cors(options))
            await next()
        } else {
            await next()
        }
    }
}

module.exports = corsl