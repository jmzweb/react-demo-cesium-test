/**
 * Models 是从 Schema 编译来的构造函数。 它们的实例就 代表 着 可以 从数据库
 * 保存 和读取的 documents .
 * 从数据库 创建 和 读取 document 的所有操作都是 通过 model 进行的。
 *
 * var schema = new mongoose.Schema({name: 'string', size: 'string'})
 * var Tank = mongoose.model('Tank', schema)
 *
 * 第一个参数是跟 model 对应的集合 collection 名字的 单数 形式。 Mongoose 会
 * 自动找到名称是 model 名字 复数形式的 collection。
 *
 * 对于上例， Tank 这个 model 就 对应数据库中 tanks 这个 collection .
 * .model() 这个函数是对 schema 做了拷贝 (生成了 model) 。 你要确保在调用
 * .model() 之前把所有需要的东西都加进 schema 里。
 *
 * **/

const moogose = require("mongoose")
const Schema = moogose.Schema


const AdminSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  power: Array,
  superAdmin: Boolean,
  effect: Boolean,
  receiveMail: Boolean
})

const Admin = moogose.model("admin", AdminSchema)

module.exports = Admin
