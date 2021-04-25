function debounce (fn, wait) {
    var timeout = null
    return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}
// 处理函数
function handle () {
    console.log(Math.random())
}

for (let i = 0 ; i < 1000; i++) {
    debounce(handle, 1000)()
}