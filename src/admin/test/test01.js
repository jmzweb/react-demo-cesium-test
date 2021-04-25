setTimeout(function(){ console.log(1, this) }, 0)
setTimeout(() => { console.log(2, this) }, 1)
;(function () {
    setTimeout(function () { console.log(3, this) })
    setTimeout(() => { console.log(4, this) })
})(global)