function CreateCanvas(args){
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
	document.getElementById('CanvasDiv').appendChild(this.canvas)
}
CreateCanvas.prototype.clearCanvas = function() {
	//clearing everything to let it be redrawn
	this.painter.clearRect(0, 0, this.canvas.width, this.canvas.height);
};