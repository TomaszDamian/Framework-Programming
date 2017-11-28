function Player(args){
	this.xpos = args.x;
	this.ypos = args.y;
	this.width = args.width;
	this.heigth = args.heigth;
	this.hitPoints = args.hp;
	this.PlayerModelLink = args.PlayerModelLink;
	this.PlayerScore = args.Score;
	
	img = new Image();
	img.src = this.PlayerModelLink;
	this.PlayerModel = img;
}

Player.prototype.Draw = function(args) {
	//defining context on canvas
	var on_canvas = args.on;
	//drawing player on canvas
	on_canvas.drawImage(this.PlayerModel,this.xpos,this.ypos,this.width,this.heigth)
	//drawing score on canvas
	on_canvas.font = "20px Arial";
	on_canvas.fillText("Score:" + this.PlayerScore,0,20);
	//drawing hp on canvas
	on_canvas.font = "20px Arial";
	on_canvas.fillText("Hp:" + this.hitPoints,1300,20);

};

Player.prototype.AddScore = function(){
	this.PlayerScore+=100;
};
Player.prototype.GetHit = function(){
	this.hitPoints--;	
}