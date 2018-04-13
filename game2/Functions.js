function Canvas(args){
	var Playcanvas = document.createElement('canvas');
	this.width = 600;
	this.height = 600;
	Playcanvas.width = this.width;
	Playcanvas.height = this.height;
	Playcanvas.style.border = "1px solid";
	document.body.appendChild(Playcanvas);
	this.painter = Playcanvas.getContext("2d");
}
Canvas.prototype.ClearCanvas = function() {
	this.painter.clearRect(0, 0, this.width, this.height);
};	

function TimeInSeconds(){
	this.Seconds = 0;
}
TimeInSeconds.prototype.OneSecondPassed = function() {
	this.Seconds++;
};

function Player(args){
	this.SelectedColor = this.randomColor();
	this.PutPlayerDown();
	this.Angle = GetRandomNumber(180);
	this.Collisions = []
	this.Alive = true;
	this.Painter = args.Painter;
	this.PlayerNum = args.playerNum;
}
Player.prototype.DarwPlayerNumber = function(){
	this.Painter.fillStyle = "black";
	this.Painter.font = "20px Arial";
	this.Painter.fillText(this.PlayerNum,this.x-5,this.y-10)
}
Player.prototype.MoveForward = function(){
	plusRad = this.Angle*(Math.PI/180);
	plusX = Math.cos(plusRad);
	this.x = (this.x + plusX)+(3*plusX);
	
	plusY = Math.sin(plusRad);
	this.y = (this.y + plusY)+(3*plusY) ;
};
Player.prototype.DrawFront = function(){
	ShowFrontx = this.x;
	ShowFronty = this.y;

	plusRad = this.Angle*(Math.PI/180);
	plusX = Math.cos(plusRad);
	ShowFrontx = (ShowFrontx + plusX)+(20*plusX);
	
	plusY = Math.sin(plusRad);
	ShowFronty = (ShowFronty + plusY)+(20*plusY);

	this.Painter.fillStyle = "#228B22";
	this.Painter.beginPath();
	this.Painter.arc(ShowFrontx, ShowFronty, 1.9, 0, 2 * Math.PI);
	this.Painter.fill();

};
Player.prototype.PutPlayerDown = function(){
	//this might look strange but it's done so the circles dont spawn on top of the border
    this.x = Math.floor(Math.random() * 275) + 16;
    this.y = Math.floor(Math.random() * 275) + 16;
};

Player.prototype.randomColor = function (args) {
	this.PossibleColor = [
		"#f736cd", "#835802", "#2fb33f",
		"#823c1e", "#77b765", "#17069d",
		"#8429d8", "#0795d8", "#4597ff",
		"#d60513", "#09a8eb", "#f0bf6b",
		"#f5840c", "#570ce9"
	];
	var Length = this.PossibleColor.length;
	ColorNumber = GetRandomNumber(Length);
	return this.PossibleColor[ColorNumber];
};
Player.prototype.AddToCollisionTrail = function(){
	if(this.Collisions.length >= 30){
		this.Collisions.splice(0,1);	
	};
	this.Collisions.push({
		x:this.x,
		y:this.y
	});
};
Player.prototype.RemoveLastColor = function(PreviousColor){
	//get the index where the color was.
	var index = this.PossibleColor.indexOf(PreviousColor);
	//remove the color.
	this.PossibleColor.splice(index, 1);
};
Player.prototype.PickAgain = function (PreviousColor) {
	this.RemoveLastColor(PreviousColor);

	var ColorQuantity = this.PossibleColor.length;
	ColorNumber = GetRandomNumber(ColorQuantity);

	//and then we set the color.
	this.SelectedColor = this.PossibleColor[ColorNumber];
};
Player.prototype.DrawSelf = function () {
	this.Collisions.forEach((element)=>{
		this.DrawCirlce(5,this.SelectedColor,element.x,element.y);
		
	});
	lastObject = this.Collisions[this.Collisions.length-1]
	this.DrawCirlce(3,"black",lastObject.x,lastObject.y);
};
Player.prototype.DrawCirlce = function(Diameter, Color, x, y){
	this.Painter.fillStyle = Color;
	this.Painter.beginPath();
	this.Painter.arc(x, y, Diameter, 0, 2 * Math.PI);
	this.Painter.fill();
};

Player.prototype.turnRight = function(){
	this.Angle = this.Angle - 4;
};

Player.prototype.turnLeft = function(){
	this.Angle = this.Angle + 4;
}

function GetRandomNumber(MaxNumber){
	return Math.floor(Math.random()*MaxNumber);
}

function CheckIfColorsAreTheSame(PAcolor, PBcolor){
	if(PAcolor === PBcolor){
		this.SecondPlayer.PickAgain(PAcolor);
	}
}