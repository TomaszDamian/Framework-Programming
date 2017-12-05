function CollisionDetection(){
	this.Invincible = false;
}

CollisionDetection.prototype.borderCollison = function(args){
	var theplayer=args.theplayer;

	var Xpos = args.PlayerXpos;
	var Ypos = args.PlayerYpos;
	var PlayerWidth = args.PlayerWidth;
	var PlayerHeigth = args.PlayerHeigth;
	var CanvasWidth = args.CanvasWidth;
	var CanvasHeigth = args.CanvasHeigth;

	if(Xpos < 0){
		theplayer.xpos = 0;
	}
	if(Ypos < 0){
		theplayer.ypos = 0;
	}
	if(Xpos > CanvasWidth-PlayerWidth){
		theplayer.xpos = CanvasWidth-PlayerWidth;
	}
	if(Ypos > CanvasHeigth-PlayerHeigth){
		theplayer.ypos = CanvasHeigth-PlayerHeigth;
	}
};

CollisionDetection.prototype.PlayerCollision = function(args){
	var Player = args.Player;
	var Goomba = args.Goomba;
	var cthis = this
	if(!this.Invincible){
		if(Player.xpos <= Goomba.xposNumber + Goomba.width &&
		Player.xpos + Player.width >= Goomba.xposNumber &&
		Player.ypos <= Goomba.yposNumber + Goomba.heigth &&
		Player.heigth + Player.ypos >= Goomba.yposNumber){
			this.Invincible = true;

			setTimeout(function(){
				cthis.Invincible = false;
			},2000)

			return true;
		}
		
		
	};
}