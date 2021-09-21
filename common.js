console.log(document.querySelectorAll((".navbar li")))
const navItems=document.querySelectorAll(".navbar li a")
navItems.forEach((item,idx)=>{
    
    item.addEventListener("click",(event)=>{
        for(let i=0;i<navItems.length;i++){
            if(i===idx){
                navItems[i].parentElement.classList.add('active');
            }else{
                navItems[i].parentElement.classList.remove('active');
            }
        }
    });
    
   
    

});


