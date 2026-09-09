document.querySelector('#items').addEventListener('click',(e)=>{
    console.log(e);
    if(e.target.tagName==='LI'){
        window.location.href = "/"+e.target.id
    }
})