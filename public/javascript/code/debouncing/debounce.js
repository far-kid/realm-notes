let counter = 0;
const getData = function(name){
    console.log("Fetched Data :",name,",", counter++)
}

const debounce = function(fn,d){
    let timeout;
    return function(...args){
        const context = this

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            fn.apply(context,args)
        },d);
    }
}

const debounceGetData30 = debounce(getData,300)