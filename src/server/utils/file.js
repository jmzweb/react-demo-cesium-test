/**
 * archiver => 用于存档 生成的 流式 界面
 * => require modules <=
 * const fs = require("fs")
 * const archiver = require("archiver")
 * => create a file to stream archive data to . <=
 * const output = fs.createWriteStream(__dirname + "/example.zip")
 * const archive = archiver("zip", {zlib: {level: 9}})  => Sets the compression level ?? 设置压缩级别 <=
 * => listen for all archive data to be written
 * => "close" event is fired only when a file descriptor is involved
 * output.on("close", function(){
 *      console.log(archive.pointer() + "total bytes")
 *      console.log("archiver has been finalized and output file descriptor has closed")
 * })
 * => This event is fired when the data source is drained no matter what was the data source
 * => It is not part of this library but rather from the NodeJS Stream API
 * => @see: https://nodejs.org/api/stream.html#stream_event_end
 * output.on("end", function(){
 *      console.log("Data has been drained")
 * })
 * => good practice to catch warnings (ie stat failures and other non-blocking errors)
 * => 捕捉警告的良好做法。( ie状态故障 和 其他的非阻塞的错误 )
 * archive.on("warning", function(err){
 *      if(err.code === "ENOENT"){
 *          => LOG WARNING
 *      } else {
 *          => throw error
 *          throw err
 *      }
 * })
 * => good practice to catch this error explicitly
 * archive.on("error", function(err){
 *      throw err
 * })
 * => pipe archive data to the file --- 将归档数据管道传输到文件
 * archive.pipe(output)
 * => append a file from stream --- 从流追加文件
 * const file1 = __dirname + "/file1.txt"
 * archive.append(fs.createReadSteam(file1), {name: "file1.txt"})
 * => append a file from string --- 从字符串追加文件
 * archive.append("string cheese!", {name: "file2.txt"})
 * => append a file from buffer --- 从二进制追加文件
 * const buffer3 = Buffer.from("buff it !")
 * archive.append(buffer3, {name: "file3.txt"})
 * => append a file --- 追加一个文件
 * archive.file("file1.txt", {name: "file4.txt"})
 * => append files from a sub-directory and naming it `new-subdir` within the archive
 * => 追加文件 从一个子目录 和 以一个新子目录为名字 在档案馆内
 * archive.directory("subdir/", "new-subdir")
 * => append files from a sub-directory , putting its contents at the root of archive
 * => 追加文件 从 一个子目录，将它的内容 放在 存档的根目录下。
 * archive.directory("subdir/", false)
 * => append files from a glob pattern --- 从 glob 模式中追加文件
 * archive.glob("subdir/*.txt")
 * => finalize the archive (ie we are done appending files but streams have to finish yet)
 * => 敲定这个文档 --- ie 我们完成追加文件， 但流必须完成 才能敲定。
 * => 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
 * archive.finalize()
 *
 *
 * */

const fs = require("fs")
const {exec} = require("child_process")
const archiver = require("archiver")


const deleteFolder = async (path) => {
    return new Promise( async (resolve, reject) => {
        let files = []
        if(fs.existsSync(path)){
            files = fs.readdirSync(path)
            await files.forEach(function(file, index){
                let curPath = path + "/" + file
                if(fs.statSync(curPath).isDirectory()){
                    deleteFolder(curPath)
                } else {
                    fs.unlinkSync(curPath)
                }
            })
            fs.rmdirSync(path)
        }
        resolve()
    })
}

function zip(dbpath){
    return new Promise((resolve, reject) => {
        let output = fs.createWriteStream(dbpath + ".zip")
        let archive = archiver("zip")
        output.on("close", function () {
            resolve()
        })
        output.on("end", function () {
            resolve()
        })
        output.on("error", function (err) {
            reject()
        })
        archive.pipe(output)
        archive.directory(dbpath + "/", false)
        archive.finalize()
    })
}

function execFun(com) {
    return new Promise((resolve, reject) => {
        exec(com, (error, stdout, stderr) => {
            if(error){
                console.error(`exec error: ${error}`)
                reject(error)
                return
            }
            resolve(stdout)
        })
    })
}

module.exports = {
    deleteFolder, zip, execFun
}