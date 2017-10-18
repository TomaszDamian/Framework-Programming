window.onload = function(){
	var canvas=document.createElement('canvas');
	var Breakingelement = document.createElement("br")
	var Rinput = document.createElement("input");
	var ctx = canvas.getContext("2d");
	
	canvas.id='thecanvas';
	canvas.width='1000';
	canvas.height='800';
	canvas.style.border='1px solid red';
	canvas.addEventListener("mousedown",MouseDown);
	canvas.addEventListener("mousemove",GetMousePosition);
	canvas.addEventListener("mouseup",MouseUp);
	document.body.appendChild(canvas);
	document.body.appendChild(Breakingelement)
	document.body.appendChild(Rinput)
	
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
		MouseXpos = event.clientX - 8;
		MouseYpos = event.clientY - 10;
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
	
	function implement_moment_in_time(){
		if(IsMouseDown){DrawWithCurosr(PrevMouseXpos,PrevMouseYpos,MouseXpos,MouseYpos)}
		requestAnimationFrame(implement_moment_in_time);
	}
	implement_moment_in_time();
};