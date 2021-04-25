function Person(){}
function Con(){
    Person.call(this, "per")
    this.age = 12
}

var con1 = new Con()

console.log( con1.age )

