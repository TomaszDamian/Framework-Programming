function mbase(){
	//this makes it possible to call all the functions withing the master class
	this.Canvas = new CreateCanvas();
	this.Player = new Player({x:250,y:250,heigth:100,width:65,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png",Score:0});
	this.detectCollision = new CollisionDetection({});
	
	this.moveup = false;
	this.movedown = false;
	this.moveleft = false;
	this.moveright = false;
	
	this.AmountCreated = 0;
	this.AmountDead = 0;
	this.Timer = 600; 
	//softcap the amount of goombas to 1000 so it doesn't overload the whole system
	this.amountToCreate = 1000;
	this.gumbas=[];
};
 
mbase.prototype.CreateGoombas = function(){
	cthis = this
	if(this.AmountCreated < this.amountToCreate){
		setTimeout(function() {
			cthis.AmountCreated++;
			var GoombaID = "goomba" + cthis.AmountCreated;
			GoombaObject = new Enemy({EnemyModleLink:"https://i.imgur.com/rsaFhHn.png",CanvasWidth:cthis.Canvas.CanvasWidth})
			cthis.gumbas.push({ID:GoombaID,Goomba:GoombaObject})
			cthis.CreateGoombas();
		},cthis.Timer)	
	}
	else{
		cthis.CreateGoombas();
	}
};

mbase.prototype.DetectHit = function(){
	var cthis = this;
	this.gumbas.forEach(function(ThisGumba){
		var HitDetected = cthis.detectCollision.PlayerCollision({
			Goomba:ThisGumba.Goomba,
			Player:cthis.Player,
		});
		if(HitDetected){
			cthis.Player.GetHit();
		}
	});
}

mbase.prototype.DrawGoombas = function(){
	cthis = this;
	this.gumbas.forEach(function(ThisGumba){
		ThisGumba.Goomba.Draw({on:cthis.Canvas.painter});
		var IsDead = ThisGumba.Goomba.death()
		if(IsDead){
			cthis.DeleteGoomba(ThisGumba.ID);
			cthis.Player.AddScore();
			IsDead = false;
		};
	});
}

mbase.prototype.DeleteGoomba = function(GoombaID) {
	var DeadGoomba = this.gumbas.findIndex(x => x.ID === GoombaID);
	this.gumbas.splice(DeadGoomba, 1);
	this.AmountCreated--;
	this.AmountDead++;
};

mbase.prototype.onload = function() {
	var cthis = this;

	cthis.CreateGoombas()

	//this is for onkeydown
	//detects if a key was pressed
	document.onkeydown = function(event){
		KeyPressed = event.keyCode
		switch (KeyPressed) {
			case 87:
				cthis.moveup = true;

				break;
			case 83:
				cthis.movedown = true;
				break;

			case 65:
				cthis.moveleft = true;
				break;

			case 68:
				cthis.moveright = true;
				break;
		};
	};
	//same as above but it detects when a button is released
	document.onkeyup = function(event){
		KeyPressed = event.keyCode
		switch (KeyPressed) {
			case 87:
				cthis.moveup = false;
				break;
			case 83:
				cthis.movedown = false;
				break;

			case 65:
				cthis.moveleft = false;
				break;

			case 68:
				cthis.moveright = false;
				break;
		};
	};

	/*setTimeout(function(){
		delete cthis.Enemy
		console.log(cthis.Enemy)
	},1000)*/
	function implement_moment_in_time(){
		if(cthis.moveup){cthis.Player.ypos -= 7;};	
		if(cthis.movedown){cthis.Player.ypos += 7;};
		if(cthis.moveleft){cthis.Player.xpos -= 7};
		if(cthis.moveright){cthis.Player.xpos += 7};
		//clearing canvas
		cthis.Canvas.clearCanvas();

		cthis.detectCollision.borderCollison({
			PlayerXpos:cthis.Player.xpos,
			PlayerYpos:cthis.Player.ypos,
			PlayerWidth:cthis.Player.width,
			PlayerHeigth:cthis.Player.heigth,
			theplayer:cthis.Player,
			CanvasWidth:cthis.Canvas.CanvasWidth,
			CanvasHeigth:cthis.Canvas.CanvasHeigth,
		});

		cthis.DetectHit();
		//drawing player
		cthis.Player.Draw({on:cthis.Canvas.painter});

		//cthis.gumbas.first_gumba.Draw({on:cthis.Canvas.painter});
		//cthis.gumbas.second_gumba.Draw({on:cthis.Canvas.painter});
		cthis.DrawGoombas();
		requestAnimationFrame(implement_moment_in_time);
		
	};
	implement_moment_in_time();
};