var a = (() => {
  var num = 0
  return () => {
    num++;
    return num;
  }
})()
console.log(a())
console.log(a())

//
console.log("------------------------------------")

console.log(2 + + "2")
console.log(2 + [1, 2])
console.log(2 + {a: 1})

console.log("------------------------------------")

var b = {
  m: function(){
    if (!this.time) {
      console.log('b')
      setTimeout(function(){ 
        this.time = function () {
          console.log('c')
        }
        this.time()
      }, 25)
    }
  }
}
console.log('1')
b.m()
console.log("2")
setTimeout(function(){
  b.m()
}, 1500)
setTimeout(function(){
  b.m()
}, 3000)

console.log('-----------------------------------')


const arr = [1 ,3 ,5]
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => { console.log(i, arr[i]) }, 0)
}
// for (var i = 0; i < arr.length; i++) {
//   setTimeout((function(){
//     console.log(arr[i])
//   })(), 0)
  
// }

var data = {
  age: 3,
}
console.log(10, data.age)

fn()
function define (data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      return val + 1
    },
    set: function (newVal) {
      console.log('newVal', newVal)
      val = newVal + 1
    }
  })
}
function fn (){
  Object.keys(data).forEach(function(key){
    define(data, key, data[key])
  })
}
console.log(10, data.age)
data.age = 5
console.log(10, data.age)


// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 

