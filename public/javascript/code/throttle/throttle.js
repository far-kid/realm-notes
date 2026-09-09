let counter = 0
function sendData(name){
    console.log("Data being sent: ",name,",",counter++)
}

function throttle(fn,t){
    let flag = true;
    return function(...args){
        if(flag){
            fn.apply(this,args);
            flag = false;
            setTimeout(()=>{
                flag=true;
            },t)
        }
    }
}

const throttleSendData1000 = throttle(sendData,1000)