let name1 = {
    firstname : "Chandan",
    lastname : "Sahoo"
}

function printName(country, state){
    console.log("Name : ",this.firstname+" "+this.lastname+","+state+","+country);
}

printName.apply(name1,["India","Delhi"])

Function.prototype.myApply = function(ctx,args){
    const scope = this
    if(typeof scope !== "function"){
        console.log("Not callable");
        return;
    }
    if(!Array.isArray(args)){
        console.log("Arguments are not type of array")
        return;
    }
        ctx.fn = scope
        const returnVal = ctx.fn(...args)
        delete ctx.fn

        return returnVal
}

printName.myApply(name1,["India","Delhi"])