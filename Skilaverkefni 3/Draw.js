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
document.getElementById('RedColorNumber').value = 0;
document.getElementById('GreenColorNumber').value = 0;
document.getElementById('BlueColorNumber').value = 0;
document.getElementById('BrushSize').value = 4;


var IsMouseDown = false;
var PrevMouseXpos = 0;
var PrevMouseYpos = 0;
var MouseXpos = 0;
var MouseYpos = 0;
var Rcolor = 0;
var Gcolor = 0;
var Bcolor = 0;
var BrushSize = 4;
var DrawingWith = true;
var ActiveRainbow = false;
var Rdecrease = false;
var Gdecrease = false;
var Bdecrease = false;
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
	if(document.getElementById('RedColorNumber').value.length===0){
		document.getElementById('RedColorNumber').value = 0;
		Rcolor = 0

	}
	if(document.getElementById('GreenColorNumber').value.length===0){
		document.getElementById('GreenColorNumber').value = 0;
		Gcolor = 0
	}
	if(document.getElementById('BlueColorNumber').value.length===0){
		document.getElementById('BlueColorNumber').value = 0;
		Bcolor = 0
	}
	if(DrawingWith){
		ctx.beginPath();
		ctx.arc(posX, posY, BrushSize, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(" + Rcolor + "," + Gcolor + "," + Bcolor + ",254)";
		ctx.fill();
	}
	else{
		ctx.beginPath();
		ctx.moveTo(prevX,prevY)
		ctx.lineTo(posX,posY)
		ctx.strokeStyle = "rgba(" + Rcolor + "," + Gcolor + "," + Bcolor + ",254)";
		ctx.lineWidth = BrushSize
		ctx.stroke();
		ctx.closePath();
	};
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

function TakeRedColor(){
	Rcolor = document.getElementById('RedColorNumber').value;
	if(Rcolor > 255){
		document.getElementById('RedColorNumber').value = 255;
		Rcolor = 255;
	};
	if(Rcolor < 0){
		document.getElementById('RedColorNumber').value = 1;
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
		document.getElementById('GreenColorNumber').value = 1;
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
		document.getElementById('BlueColorNumber').value = 1;
		Bcolor = 0;
	};
};

function GetBrushSize(){
	BrushSize = document.getElementById('BrushSize').value;
	if(DrawingWith === false){
		if (BrushSize > 6){
			document.getElementById('BrushSize').value = 6;
			BrushSize = 6;
		};
		if(BrushSize < 0){
			document.getElementById('BrushSize').value = 1;
			BrushSize = 0;
		};
	}
};

function RestartColors(){
	document.getElementById('RedColorNumber').value = 0;
	document.getElementById('GreenColorNumber').value = 0;
	document.getElementById('BlueColorNumber').value = 0;
	Rcolor = 0;
	Gcolor = 0;
	Bcolor = 0;
};

function MakeRainbow(){
	if(ActiveRainbow === false){
		ActiveRainbow = true;
		document.getElementById('Rainbow').innerHTML = "stop rainbow :("
	}
	else{
		ActiveRainbow = false;
		document.getElementById('Rainbow').innerHTML = "Make Rainbow :D"
	}
}

function AnimateRainbow(){
	document.getElementById('RedColorNumber').value = Rcolor;
	document.getElementById('GreenColorNumber').value = Gcolor;
	document.getElementById('BlueColorNumber').value = Bcolor;
	console.log(Rcolor,Gcolor,Bcolor)
	if(Rcolor > 255){
		Rdecrease = true;
	}if(Rcolor < 0){
		Rdecrease = false;
	};
	if(Gcolor > 255){
		Gdecrease = true;
	}if(Gcolor < 0){
		Gdecrease = false;
	};
	if(Bcolor > 255){
		Bdecrease = true;
	}if(Bcolor < 0){
		Bdecrease = false;
	};
	if(Rdecrease){
		Rcolor--;
		console.log("hello")
	}else{
		Rcolor++;
		console.log("goodbye")
	};
	if(Gdecrease){
		Gcolor--;
	}else{
		Gcolor++;
	};
	if(Bdecrease){
		Bcolor--;
	}else{
		Bcolor++;
	};
}

function DrawWithCircle(){
	DrawingWith = true;
	document.getElementById('CirlceButton').className = "button is-info is-large"
	document.getElementById('SquareButton').className = "button is-danger is-large"
	document.getElementById('avalible').innerHTML = "avalible sizes: all"
};

function DrawWithSquare() {
	DrawingWith = false;
	document.getElementById('SquareButton').className = "button is-info is-large"
	document.getElementById('CirlceButton').className = "button is-danger is-large"
	document.getElementById('avalible').innerHTML = "avalible sizes: 1-6"
	if(document.getElementById('BrushSize').value > 6){
		document.getElementById('BrushSize').value = 6
		BrushSize = 6
	}
};

function ClearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function ColorDivChange(Rcolor,Gcolor,Bcolor){
	document.getElementById('Ccolor').style.backgroundColor = "rgb(" + Rcolor + "," + Gcolor + "," + Bcolor + ")";
};

function implement_moment_in_time(){
	if(IsMouseDown){
		if(ActiveRainbow){
		AnimateRainbow();
		};
		DrawWithCurosr(PrevMouseXpos,PrevMouseYpos,MouseXpos,MouseYpos,Rcolor,Gcolor,Bcolor,BrushSize)
	}
	
	requestAnimationFrame(implement_moment_in_time);
	ColorDivChange(Rcolor,Gcolor,Bcolor)

};
implement_moment_in_time();