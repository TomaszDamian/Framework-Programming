var canvas=document.createElement('canvas');
ctx = canvas.getContext("2d");

canvas.id='thecanvas';
canvas.width='800';
canvas.height='600';
canvas.style.border='1px solid red';
canvas.addEventListener("mousedown",MouseDown);
canvas.addEventListener("mousemove",GetMousePosition);
canvas.addEventListener("mouseup",MouseUp);
document.getElementById('canvasDiv').appendChild(canvas);
document.getElementById('RedColorNumber').value = 1;
document.getElementById('GreenColorNumber').value = 1;
document.getElementById('BlueColorNumber').value = 1;
document.getElementById('BrushSize').value = 1;


var IsMouseDown = false;
var PrevMouseXpos = 0;
var PrevMouseYpos = 0;
var MouseXpos = 0;
var MouseYpos = 0;
var Rcolor = 1;
var Gcolor = 1;
var Bcolor = 1;
var BrushSize = 1;
var image_data = [];
var paintedPixels = [];

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
	ctx.strokeStyle = "rgba(" + Rcolor + "," + Gcolor + "," + Bcolor + ",254)";
	ctx.lineWidth = BrushSize;
	ctx.stroke();
	ctx.closePath();
};

/* dont mind this just future referece
canvas_array=[[]]
canvas_array[mousex][mousey]={painted_at:}
one_pixel={}

slot numer..
radius

faerd til baka

lista af slot numerum.
*/
function getImageData(){
	image_data=ctx.getImageData(0,0,canvas.width,canvas.height);
}

function CheckIfPixelIspainted(){
	for (var counter = 4; counter <= image_data.data.length; counter + 4){
		if(image_data.data[counter]===254){
			paintedPixels.append(image_data.data[counter])
		}
	}
	console.log(paintedPixels)
}


function TakeRedColor(){
	Rcolor = document.getElementById('RedColorNumber').value;
	if(Rcolor > 255){
		document.getElementById('RedColorNumber').value = 255;
		Rcolor = 255;
	};
	if(Rcolor < 1){
		document.getElementById('RedColorNumber').value = 1;
		Rcolor = 1;
	};
};

function TakeGreenColor(){
	Gcolor = document.getElementById('GreenColorNumber').value;
	if(Gcolor > 255){
		document.getElementById('GreenColorNumber').value = 255;
		Gcolor = 255;
	};
	if(Gcolor < 1){
		document.getElementById('GreenColorNumber').value = 1;
		Gcolor = 1;
	};
};

function TakeBlueColor(){
	Bcolor = document.getElementById('BlueColorNumber').value;
	if(Bcolor > 255){
		document.getElementById('BlueColorNumber').value = 255;
		Bcolor = 255;
	};
	if(Bcolor < 1){
		document.getElementById('BlueColorNumber').value = 1;
		Bcolor = 1;
	};
};

function GetBrushSize(){
	BrushSize = document.getElementById('BrushSize').value;
	if (BrushSize > 6){
		document.getElementById('BrushSize').value = 6;
		BrushSize = 6;
	};
	if(BrushSize < 1){
		document.getElementById('BrushSize').value = 1;
		BrushSize = 1;
	};
};

function RestartColors(){
	document.getElementById('RedColorNumber').value = 1;
	document.getElementById('GreenColorNumber').value = 1;
	document.getElementById('BlueColorNumber').value = 1;
	Rcolor = 1;
	Gcolor = 1;
	Bcolor = 1;
};

function ClearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function ColorDivChange(Rcolor,Gcolor,Bcolor){
	document.getElementById('Ccolor').style.backgroundColor = "rgb(" + Rcolor + "," + Gcolor + "," + Bcolor + ")";
};

function implement_moment_in_time(){
	if(IsMouseDown){
		DrawWithCurosr(PrevMouseXpos,PrevMouseYpos,MouseXpos,MouseYpos,Rcolor,Gcolor,Bcolor,BrushSize)
		getImageData()
	}
	requestAnimationFrame(implement_moment_in_time);
	ColorDivChange(Rcolor,Gcolor,Bcolor)

};

implement_moment_in_time();