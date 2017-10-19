var canvas=document.createElement('canvas');
/*var para = document.createElement("p");
var node = document.createTextNode("it is not reccomended that your pen size goes over 5 points");
para.appendChild(node)*/
var ctx = canvas.getContext("2d");

canvas.id='thecanvas';
canvas.width='1000';
canvas.height='800';
canvas.style.border='1px solid red';
canvas.addEventListener("mousedown",MouseDown);
canvas.addEventListener("mousemove",GetMousePosition);
canvas.addEventListener("mouseup",MouseUp);
document.getElementById('canvasDiv').appendChild(canvas);
//document.getElementById('canvasDiv').appendChild(para)


var IsMouseDown = false;
var PrevMouseXpos = 0;
var PrevMouseYpos = 0;
var MouseXpos = 0;
var MouseYpos = 0;

function MouseDown(){
	IsMouseDown = true;
}
function MouseUp(){
	IsMouseDown = false;
}

function GetMousePosition(event){
	PrevMouseXpos = MouseXpos
	PrevMouseYpos = MouseYpos
	MouseXpos = event.clientX;
	MouseYpos = event.clientY;
}

function DrawWithCurosr(prevX,prevY,posX,posY) {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(posX, posY);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();
}

function TakeRedColor(){
	document.getElementById('')
}

function implement_moment_in_time(){
	if(IsMouseDown){DrawWithCurosr(PrevMouseXpos,PrevMouseYpos,MouseXpos,MouseYpos)}
	requestAnimationFrame(implement_moment_in_time);
}
implement_moment_in_time();