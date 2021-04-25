/**
 * 连接 数据库
 *
 * 1. 查询
 * 用 mongoose 查询文档相当容易， 它支持 MongoDB 的高级 rich 查询语法。
 * 查询文档可以用 model 的 find， findById, findOne, where 这些静态方法。
 * Tank.find({size: "small"}).where("createdDate").gt(oneYearAgo).exec(callback)
 *
 * 2. 增加
 * 3. 更新 update
 * 4. 删除 remove
 * */

const mongoose = require("mongoose")
const path = require("path")
const serverConfig = require("../config/mongodb")
const {Admin} = require("../src/server/model")
const colors = require("colors")

async function connectMongodb(){
    /***
        const options = {
            // 底层 MongoDB 驱动在连接丢失后将自动重连。 除非你是可以自己管理连接池的高手， 否则不要吧这个选项设为 false
            autoReconnect: true,
            //不建立keys
            autoIndex: false,
            //
            reconnectTries: Number.MAX_VALUE,
            // 重连需 500ms
            reconnectInterval: 500,
            // MongoDB 保持的最大 socket 连接数。
            poolSize: 10,
            // MongoDB 驱动同样有自己的离线时 缓存机制。 如果你希望连接错误终止数据库操作，
            // 请将此选项设为 0 以及 把 bufferCommands 设为 false
            bufferMaxEntries: 0,
            bufferCommands: false,
            // 对于长期运行的后台应用， 启用毫秒级 keepAlive 是一个精明的操作
            // 不这么做你可能会经常 收到看似毫无原因的 "connection closed" 错误。
            keepAlive: 1000,
        }
     */
    const options = { useNewUrlParser: true }
    const [user, pass, host, port, db] = [
        serverConfig.database.user,
        serverConfig.database.pass,
        serverConfig.database.host,
        serverConfig.database.port,
        serverConfig.database.db,
    ]
    let uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`
    await mongoConnection(uri, options)
    await initSpuer()

}

function initSpuer(){
    return new Promise( async (resolve, reject) => {
        const { superUsername, superPassword, email, phone } = serverConfig.database
        let superAdmin = await Admin.find({"username": superUsername})
        if(superAdmin.length === 0){
            let user = new Admin({
                username: superUsername,
                password: superPassword,
                power: [],
                email ,
                phone,
                superAdmin: true,
                effect: true,
                receiveMail: true,
            })
            await user.save()
        } else {
            resolve()
        }
    } )
}

function mongoConnection(uri, options){
    return new Promise((resolve, reject) => {
        mongoose.connect(uri, options).then(
            () => {
                console.log("数据库连接成功".green)
                resolve()
            },
            err => {
                console.log("数据库连接失败"+err.red)
                process.exit(1)
                reject(err)
            }
        )
    })
}

module.exports = connectMongodb