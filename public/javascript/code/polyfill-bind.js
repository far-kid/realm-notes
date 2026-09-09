let name1 = {
    firstname : "Chandan",
    lastname : "Sahoo"
}

function printName(country, state){
    console.log("Name : ",this.firstname+" "+this.lastname+","+state+","+country);
}

let printMyName = printName.bind(name1,"India");
printMyName("Delhi")

// polyfill
Function.prototype.myBind = function(...args1){
    const scope = this
    const ctx = args1[0];

    return function(...args2){
        const params = [...(args1.slice(1)),args2];
        return scope.apply(ctx,params)
    }
}

Function.prototype.myTrueBind = function(...args1){
    const scope = this
    const ctx = args1[0];

    return function(...args2){
        const params = [...(args1.slice(1)),...args2];

        ctx.fn = scope
        const returnVal = ctx.fn(...params)
        delete ctx.fn

        return returnVal
    }
}

Function.prototype.myBind = function(ctx,...args1){
    const scope = this

    if(typeof scope!=="function"){
        console.log("Not callable")
        return;
    }

    ctx = ctx ?? globalThis

    const inner =  function(...args2){
        const finalArgs = [...args1,...args2]

        if(this instanceof inner){
            return scope.apply(this,finalArgs)
        }

        const fn = Symbol()

        ctx[fn]=scope

        const val = ctx[fn](...finalArgs)

        delete ctx[fn];

        return val
    }

    inner.prototype = Object.create(scope.prototype)

    return inner

}



let printHerName = printName.myTrueBind(name1,"India")
printHerName("Delhi")
