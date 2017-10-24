var canvas=document.createElement('canvas');
/*var para = document.createElement("p");
var node = document.createTextNode("it is not reccomended that your pen size goes over 5 points");
para.appendChild(node)*/
ctx = canvas.getContext("2d");

canvas.id='thecanvas';
canvas.width='1000';
canvas.height='800';
canvas.style.border='1px solid red';
canvas.addEventListener("mousedown",MouseDown);
canvas.addEventListener("mousemove",GetMousePosition);
canvas.addEventListener("mouseup",MouseUp);
document.getElementById('canvasDiv').appendChild(canvas);
document.getElementById('RedColorNumber').value = 0;
document.getElementById('GreenColorNumber').value = 0;
document.getElementById('BlueColorNumber').value = 0;
document.getElementById('BrushSize').value = 1;
//document.getElementById('canvasDiv').appendChild(para)


var IsMouseDown = false;
var PrevMouseXpos = 0;
var PrevMouseYpos = 0;
var MouseXpos = 0;
var MouseYpos = 0;
var Rcolor = 0;
var Gcolor = 0;
var Bcolor = 0;
var BrushSize = 1;

function MouseDown(){
	IsMouseDown = true;
};

function MouseUp(){
	IsMouseDown = false;
};

function GetMousePosition(event){
	PrevMouseXpos = MouseXpos
	PrevMouseYpos = MouseYpos
	MouseXpos = event.clientX;
	MouseYpos = event.clientY;
};

function DrawWithCurosr(prevX,prevY,posX,posY,Rcolor,Gcolor,Bcolor,BrushSize) {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(posX, posY);
	ctx.strokeStyle = "rgb(" + Rcolor + "," + Gcolor + "," + Bcolor + ")";
	ctx.lineWidth = BrushSize;
	ctx.stroke();
	ctx.closePath();
};

function TakeRedColor(){
	Rcolor = document.getElementById('RedColorNumber').value;
	if(Rcolor > 255){
		document.getElementById('RedColorNumber').value = 255;
		Rcolor = 255;
	};
	if(Rcolor < 0){
		document.getElementById('RedColorNumber').value = 0;
		Rcolor = 0;
	};
};
function TakeGreenColor(){
	Gcolor = document.getElementById('GreenColorNumber').value;
	if(Gcolor > 255){
		document.getElementById('GreenColorNumber').value = 255;
		Gcolor = 255;
	};
	if(Gcolor < 0){
		document.getElementById('GreenColorNumber').value = 0;
		Gcolor = 0;
	};
};
function TakeBlueColor(){
	Bcolor = document.getElementById('BlueColorNumber').value;
	if(Bcolor > 255){
		document.getElementById('BlueColorNumber').value = 255;
		Bcolor = 255;
	};
	if(Bcolor < 0){
		document.getElementById('BlueColorNumber').value = 0;
		Bcolor = 0;
	};
};
function GetBrushSize(){
	BrushSize = document.getElementById('BrushSize').value;
	if (BrushSize > 6){
		document.getElementById('BrushSize').value = 6;
		BrushSize = 6;
	};
	if(BrushSize < 1){
		document.getElementBy('BrushSize').value = 1;
		BrushSize = 1;
	};
}
function ClearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};
function implement_moment_in_time(){
	if(IsMouseDown){DrawWithCurosr(PrevMouseXpos,PrevMouseYpos,MouseXpos,MouseYpos,Rcolor,Gcolor,Bcolor,BrushSize)}
	requestAnimationFrame(implement_moment_in_time);
};
implement_moment_in_time();