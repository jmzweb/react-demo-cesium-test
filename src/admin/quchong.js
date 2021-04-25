var fs = require("fs")

String.prototype.trim = function() {
   return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var arr1, arr2, arr3



function writeFile(data){
    fs.writeFile("./text.txt", data, function(err){})
}

fs.readFile("test01.txt","utf-8",(err,str) => {
    if(err){}else {
        // console.log(data)
        arr1 =  str.trim()

        fs.readFile("test00.txt","utf-8",(err,_str) => {
            if(err){}else {
                // console.log(data)
                arr2 =   _str.trim().split("\n").filter(n => n)

                console.log(arr2.constructor === Array)

                

                arr3 = arr2.map( (n,index) => {
                    // console.log(n + ","+ index)
                    // console.log(index, arr1.indexOf(n) === -1 )
                    if(arr1.indexOf(n) === -1){
                        console.log(n)
                        return n
                    }
                })
                var __str = arr3.filter(n => n).join(" ")
                console.log(__str)
                writeFile(__str)

            }
        })

        
    }
})
