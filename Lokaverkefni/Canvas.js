function CreateCanvas(args){
	
	this.StatCanvas = document.createElement("canvas");
	this.StatPainter = this.StatCanvas.getContext('2d');
	
	//you have to make all the variables this. for all the prototypes to know what you're doing
	this.canvas=document.createElement('canvas');
	this.painter = this.canvas.getContext("2d");	

	//making canvas and appending it into the html
	this.canvas.id='thecanvas';
	this.canvas.width= args.width;
	this.CanvasWidth = this.canvas.width;
	this.canvas.height= args.heigth;
	this.CanvasHeigth = this.canvas.height;
	this.canvas.style.border='1px solid red';
	this.canvas.style.marginBottom = "20px";

	this.StatCanvas.id = "StatCanvas";
	this.StatCanvas.width = this.CanvasWidth;
	this.StatCanvas.height = 50

	document.getElementById('CanvasDiv').appendChild(this.StatCanvas)
	document.getElementById('CanvasDiv').appendChild(this.canvas)
}

CreateCanvas.prototype.clearCanvas = function() {
	//clearing everything to let it be redrawn
	this.painter.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CreateCanvas.prototype.clearStatCanvas = function(){
	this.StatPainter.clearRect(0, 0, this.StatCanvas.width, 50)
}

CreateCanvas.prototype.DrawMainMenu = function(){
	this.painter.font = "50px Arial";
	this.painter.strokeText("Mario bullet hell",280,100)
	this.painter.font = "18px Arial"
	this.painter.fillText("Use w, a, s and d to move around on the play area",80,150)
	this.painter.fillText("Avoide all the Goombas falling on your head and survive as long as you can",80,175)
	this.painter.font = "25px Arial"
	this.painter.fillText("Press ENTER to start the game",280,350)
}
CreateCanvas.prototype.DrawGameOver = function() {
	this.painter.font = "50px Arial";
	this.painter.strokeText("You died!",350,100)
	this.painter.font = "18px Arial"
	this.painter.fillText("You have died, type in your name in the box below.",70,135)
	this.painter.fillText("Then press the 'Submit' button to submit the score to the online leaderboard.",70,160)
	this.painter.font = "25px Arial"
	this.painter.fillText("Press R to restart",350,350)
};