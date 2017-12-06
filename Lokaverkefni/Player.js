function Player(args){
	this.HitSound = new Audio("./resources/oof.mp3")
	this.xpos = args.x;
	this.ypos = args.y;
	this.width = args.width;
	this.heigth = args.heigth;
	this.hitPoints = args.hp;
	this.PlayerModelLink = args.PlayerModelLink;
	this.PlayerScore = args.Score;
	this.initialiseImages();
}

Player.prototype.Draw = function(args) {
	//defining context on canvas
	var on_canvas = args.on;
	//drawing player on canvas
	on_canvas.drawImage(this.PlayerModel,this.xpos,this.ypos,this.width,this.heigth)
	
};

Player.prototype.DrawStats = function(args){
	on_StatCanvas = args.on;

	//drawing score on canvas
	on_StatCanvas.font = "20px Arial";
	on_StatCanvas.fillText("Score:" + this.PlayerScore,0,30);
	//drawing hp on canvas
	on_StatCanvas.font = "20px Arial";
	on_StatCanvas.fillText("Hp:",690,30);
	
	for (var AmountOfHeartsAlive = 0; AmountOfHeartsAlive < this.hitPoints; AmountOfHeartsAlive++){
		if(AmountOfHeartsAlive === 0){
			on_StatCanvas.drawImage(this.HeartAlive1,710,-15,80,80)
		}		
		if(AmountOfHeartsAlive === 1){
			on_StatCanvas.drawImage(this.HeartAlive2,760,-15,80,80)
		}
		if(AmountOfHeartsAlive === 2){
			on_StatCanvas.drawImage(this.HeartAlive3,810,-15,80,80)
		}
	}
	for (var HeartsDead = 0; HeartsDead < 3 - this.hitPoints; HeartsDead++) {
		
		var Numbers = [];
		Numbers.push(HeartsDead);
		var LengthOfArray = (Numbers.length) - 1;
		
		if(Numbers[LengthOfArray] === 0){
			on_StatCanvas.drawImage(this.HeartDead1,810,-15,80,80)
		}

		if(Numbers[LengthOfArray] === 1){
			on_StatCanvas.drawImage(this.HeartDead2,760,-15,80,80)
		}

		if(Numbers[LengthOfArray] === 2){	
			on_StatCanvas.drawImage(this.HeartDead1,710,-15,80,80)
		}

	}
}
Player.prototype.AddScore = function(){
	this.PlayerScore+=100;
};

Player.prototype.GetHit = function(){
	this.HitSound.play();
	this.hitPoints--;	
}

Player.prototype.initialiseImages = function(){
	PlayerImg = new Image();
	PlayerImg.src = this.PlayerModelLink;
	this.PlayerModel = PlayerImg;

	HeartAlive1 = new Image();
	HeartAlive1.src = "./resources/blueheart.png";
	this.HeartAlive1 = HeartAlive1;

	HeartAlive2 = new Image();
	HeartAlive2.src = "./resources/blueheart.png";
	this.HeartAlive2 = HeartAlive2;

	HeartAlive3 = new Image();
	HeartAlive3.src = "./resources/blueheart.png";
	this.HeartAlive3 = HeartAlive3;
	
	HeartDead1 = new Image();
	HeartDead1.src = "./resources/brokeheart.png";
	this.HeartDead1 = HeartDead1;

	HeartDead2 = new Image();
	HeartDead2.src = "./resources/brokeheart.png";
	this.HeartDead2 = HeartDead2;

	HeartDead3 = new Image();
	HeartDead3.src = "./resources/brokeheart.png";
	this.HeartDead3 = HeartDead3;
};