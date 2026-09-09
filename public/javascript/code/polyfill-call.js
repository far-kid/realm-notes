let name1 = {
    firstname : "Chandan",
    lastname : "Sahoo"
}

function printName(country, state){
    console.log("Name : ",this.firstname+" "+this.lastname+","+state+","+country);
}

printName.call(name1,"India","Delhi")

Function.prototype.myCall = function(...args1){
    const scope = this
    if(typeof this !== "function"){
        console.log("Not applicable")
    }
    const ctx = args1[0];

    ctx.fn = scope;
    const returnValue = ctx.fn(...(args1.slice(1)));
    delete ctx.fn

    return returnValue;
}

printName.myCall(name1,"India","Delhi")

