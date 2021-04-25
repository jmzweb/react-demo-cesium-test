var mm = (function () {
    let cash = 10, i = 0
    return function (y) {
        console.log(i, y)
        if (i > y) {
            console.log(cash)
            return cash
        } else {
            cash += cash * 0.05
            i++;
            mm(y)
        }
    }
})()

mm(50);

let i = 0
for (let i = 0; i<6; i++) {
    console.log(1, i)
    setTimeout(() => {
        console.log(i)
    })
}