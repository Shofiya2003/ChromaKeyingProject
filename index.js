function hasGetUserMedia(){
    return (navigator.mediaDevices.getUserMedia);
}

if(hasGetUserMedia()){
    console.log("Good to go");
}else{
    console.log("getUserMedia() is not supported by your browser");
}

let bimage=document.querySelector(".background");

const video=document.querySelector(".live-video");

const images=document.querySelectorAll(".image-options");

images.forEach(image=>{
    image.addEventListener('click',()=>{
        bimage=image;
    })
});







const constraints={
    
    video:true
};

timerCallback = function timerCallback() {
    if (video.paused || video.ended) {
      return;
    }
    computeFrame();
    setTimeout(() => {
        timerCallback();
      }, 0);
  };


  function computeFrame(){
    // if(imageInput.value!==''){
    //     video=imageInput.value;
    // }
    contextTemp.drawImage(video,0,0,canvas.width,canvas.height);
    let frames=contextTemp.getImageData(0,0,video.videoWidth,video.videoHeight);

    contextTemp.drawImage(bimage,0,0,canvas.width,canvas.height);
   
    let frames2=contextTemp.getImageData(0,0,video.videoWidth,video.videoHeight);
    for(let i=0;i<frames.data.length/4;i++){
        let offset=i*4;
        let r=frames.data[i*4+0];
        let g=frames.data[i*4+1];
        let b=frames.data[i*4+2];
        let a=frames.data[i*4+3];

        if(g>50 && g>r && g>b){
            frames.data[offset+0]=frames2.data[offset+0];
            frames.data[offset+1]=frames2.data[offset+1];
            frames.data[offset+2]=frames2.data[offset+2];
        }
    }

    context.putImageData(frames,0,0);
   
}


navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(catchError);

function gotStream(stream){
    
    video.srcObject=stream;
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    canvasTemp=document.createElement("canvas");
    contextTemp=canvasTemp.getContext('2d');
    canvasTemp.setAttribute("width",640);
    canvasTemp.setAttribute("height",480);
    canvas.setAttribute("width",640);
    canvas.setAttribute("height",480);

    video.addEventListener("play",()=>{
        timerCallback();
    }

    )}





function catchError(err){
    console.log(err);
}








let canvas;
let canvasTemp;
let contextTemp;
let context;
function init(){
    
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    canvasTemp=document.createElement("canvas");
    contextTemp=canvasTemp.getContext('2d');
    

    video.addEventListener("play",()=>{
        timerCallback();
    });
}


