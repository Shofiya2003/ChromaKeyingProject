var img=new Image();
img.crossOrigin="anonymous";
img.src="https://media.istockphoto.com/photos/beautiful-flowers-background-picture-id520700958?k=20&m=520700958&s=612x612&w=0&h=fTWRwsQ_vxzlzR0MGkLPGzqolbbpbj4x-VOL9FmEz3A="

var canvas=document.querySelector("#canvas");
var context=canvas.getContext('2d');
img.onload=function(){
    canvas.height=img.height;
    canvas.width=img.width;
    context.drawImage(img,0,0);
};

var hoveredColor=document.querySelector('.hoverColor');
var selectedColor=document.querySelector('.selectedColor');

function pick(event, destination){
    var x=event.layerX;
    var y=event.layerY;
    var pixel=context.getImageData(x,y,1,1);
    var data=pixel.data;
   
    var color=`rgba(${data[0]},${data[1]},${data[2]},${data[3]})`;
    destination.style.background=color;
    destination.textContent=color;
}

canvas.addEventListener('mousemove',(event)=>{
    pick(event,hoveredColor);
});

canvas.addEventListener('click',(event)=>{
    pick(event,selectedColor);
})