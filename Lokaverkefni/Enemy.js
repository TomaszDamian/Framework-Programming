function Enemy(args){
	this.EnemyPlayerModel = args.EnemyModleLink
	img = new Image();
	img.src = this.EnemyPlayerModel;
	this.EnemyModel = img
	
	maxXpos = args.CanvasWidth;
	this.xposNumber = Math.random()*(maxXpos-50)
	this.yposNumber = -50
}

Enemy.prototype.Draw = function(args){
	var on_canvas = args.on
	on_canvas.drawImage(this.EnemyModel,this.xposNumber,this.yposNumber,50,50)
	if(this.yposNumber < 650){
		this.yposNumber = this.yposNumber+3;
	}
	else{
		return true;
	}
}; 