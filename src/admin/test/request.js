console.log("start")
var i =3
;(function(){

    console.log("自执行1", i)
    var i = 5
    console.log("自执行2", i)
})()

setTimeout(function(){
    console.log(1)
    Promise.resolve().then(()=>{ console.log(2) })
},0)

new Promise( (res,req) => {
    console.log(3)
    setTimeout(function(){
        console.log(4)
        Promise.resolve().then(()=>{ console.log(5) })
    },0)
}).then(()=>{
    console.log(6)
    setTimeout(function(){
        console.log(7)
        Promise.resolve().then(()=>{ console.log(8) })
    },0)
})