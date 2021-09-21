let greenImage=document.querySelector(".green-image");;
let canvas;
let context;
let canvasTemp;
let contextTemp;
let background=document.querySelector('.background-input');

function downloadCanvas(){
    let image=canvas.toDataURL();

    const link=document.createElement('a');
    link.download="image.png";
    link.href=image;
    link.click();
}



canvas=document.getElementById('canvas1');
context=canvas.getContext('2d');
let imageInput=document.querySelector(".image-input");
imageInput.addEventListener('change',async (event)=>{
    
    const files=event.target.files;
     
    greenImage.src=URL.createObjectURL(files[0]);
    
   background=document.querySelector(".green-image");
   
   init();
    
    
    
})

let downloadButton=document.querySelector(".download");
downloadButton.addEventListener('click',downloadCanvas);




let arr=document.querySelectorAll(".image-options");

arr.forEach(image=>{
    image.addEventListener('click',(event)=>{
        
        background=event.target;

        console.log(background+" backgrund");
        computeFrame();
       
    })
})

function init(){
    greenImage=document.querySelector(".green-image");
    console.log(background);
    
    if(background===null) background=greenImage;
    
    canvasTemp=document.createElement("canvas");
    contextTemp=canvasTemp.getContext('2d');
    canvasTemp.setAttribute("width",800);
    canvasTemp.setAttribute("height",450);
    canvas.setAttribute("width",800);
    canvas.setAttribute("height",450);
    context.drawImage(greenImage,0,0,canvas.width,canvas.height);
    computeFrame();
}

function computeFrame(){
    console.log(background);
    console.log(greenImage);
    contextTemp.drawImage(greenImage,0,0,canvas.width,canvas.height);
    let frames=contextTemp.getImageData(0,0,canvas.width,canvas.height);
    
        
        console.log("I am ");
        contextTemp.drawImage(background,0,0,canvas.width,canvas.height);
        let frames2=contextTemp.getImageData(0,0,canvas.width,canvas.height);
        console.log(frames2);
        for(let i=0;i<frames.data.length/4;i++){
            let offset=i*4;
            let r=frames.data[i*4+0];
            let g=frames.data[i*4+1];
            let b=frames.data[i*4+2];
            let a=frames.data[i*4+3];
    
            if(g>100 && g>r && g>b){
                frames.data[offset+0]=frames2.data[offset+0];
                frames.data[offset+1]=frames2.data[offset+1];
                frames.data[offset+2]=frames2.data[offset+2];
            }
        }

        context.putImageData(frames,0,0);
    
    

       
    
   
}


window.addEventListener("load",()=>{
    console.log("Ready");
    init();
})