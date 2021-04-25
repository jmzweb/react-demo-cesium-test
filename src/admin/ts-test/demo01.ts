/**
 * @param 类
 * 最后，让我们使用类来改写这个例子。 Typescript 支持 JavaScript 的 新特性，
 * 比如支持基于类的面向对象编程。
 * 让我们创建一个 Student 类，它带有一个构造函数 和 一些公共字段。注意类 和接口
 * 可以一起共作，程序员可以自行决定抽象的级别。
 * 还要注意的是，在构造函数的参数上使用 public 等同于创建了同名的成员变量。
 */
class Student {
    fullName: string;
    constructor (public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeterA (person: Person) {
    return "hello, " + person.firstName + " " + person.lastName
}
let userA = new Student("Jane", "M.", "User")

document.body.innerHTML = greeterA(userA)