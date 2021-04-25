Function.prototype.call2 = function(context){
    var context = context || windows
    context.fn = this
    var arg = []
    for(let i = 0 ;i < arguments.length; i++){
        arg.push( "arguments["+i+"]" )
    }
    var result = eval('context.fn('+arg+')')
    delete context.fn
    return result
}
