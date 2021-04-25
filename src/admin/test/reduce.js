var arr = [1,5,9,11,12,1,8,4,1,5]

arr.reduce((perv,cur,index,arr)=>{
    // console.log(perv,cur,index,arr)
})

// var newArr1 = arr.filter( (item, index, self)=> self.indexOf(item) === index)

var newArr1 = arr.filter( (item, index, self)=> self.indexOf(item) === index)
var newObj = arr.reduce((prev,cur,index,arr)=> {
    prev[cur] = prev[cur]+1 || 1
    console.log(prev)
    return prev
},{})
var newArr2 = newArr1.filter(item => newObj[item] === 1)

console.log(newArr2)