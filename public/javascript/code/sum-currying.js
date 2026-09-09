function sum(outer){
    return function(inner){
        return inner==undefined?outer:sum(outer+inner)
    }
}

console.log(sum(1)(2)())