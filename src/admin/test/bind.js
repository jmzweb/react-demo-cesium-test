var module = {
    x: 42,
    getX: function(){
        return this.x
    }
}

var unboundGetX = module.getX;
console.log(unboundGetX()) // undefined

console.log(unboundGetX.bind(module)()) // 42