// using bind method
let multiply = function(x,y){
    console.log(x*y);
}

let multiplyByTwo = multiply.bind(this,2,3)

// using function closures

let add =  function(x){
    return function(y){
        return x+y
    }
}

let addTwo = add(2);
addTwo(3)
