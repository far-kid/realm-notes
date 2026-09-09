document.querySelector('#grandparent').addEventListener('click',(e)=>{
    console.log("Grandparent called")
},false)

document.querySelector('#parent').addEventListener('click',()=>{
    console.log("Parent called")
},true)

document.querySelector('#child').addEventListener('click',(e)=>{
    e.stopPropagation()
    console.log("Child called")
},false)