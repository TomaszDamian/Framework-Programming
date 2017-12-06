function Enemy(args){
	this.EnemyPlayerModel = args.EnemyModleLink
	img = new Image();
	img.src = this.EnemyPlayerModel;
	this.EnemyModel = img;
	
	maxXpos = args.CanvasWidth;
	this.xposNumber = Math.floor(Math.random()*(maxXpos-50));
	this.yposNumber = -50;
	this.width = args.width;
	this.heigth = args.heigth;
}

Enemy.prototype.death = function(){
	if(this.yposNumber > 650){
		return true;
	}
};

Enemy.prototype.Draw = function(args){
	var on_canvas = args.on
	on_canvas.drawImage(this.EnemyModel,this.xposNumber,this.yposNumber,this.width,this.heigth)
	this.yposNumber = this.yposNumber+8;
}; 