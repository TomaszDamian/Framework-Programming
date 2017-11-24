function Player(args){
	this.xpos = args.x;
	this.ypos = args.y;
	this.width = args.width;
	this.heigth = args.heigth;
	this.hitPoints = args.hp;
	this.PlayerModelLink = args.PlayerModelLink;
	
	img = new Image();
	img.src = this.PlayerModelLink;
	this.PlayerModel = img;
}

Player.prototype.Draw = function(args) {
	var on_canvas = args.on;
	on_canvas.drawImage(this.PlayerModel,this.xpos,this.ypos,this.width,this.heigth)
};