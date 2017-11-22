function mbase(){
	this.Canvas = new CreateCanvas();
	this.Player = new Player({x:250,y:250,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png"});
	this.moveup = false;
	this.movedown = false;
	this.moveleft = false;
	this.moveright = false;
	this.AmountCreated = 0;
	this.amountToCreate = 10;
	this.gumbas=[];
};

mbase.prototype.CreateGoombas = function(){
	cthis = this
	if(this.AmountCreated < 10){
		setTimeout(function() {
			cthis.AmountCreated++;
			var GoombaID = "goomba" + cthis.AmountCreated;
			GoombaObject = new Enemy({EnemyModleLink:"https://i.imgur.com/rsaFhHn.png",CanvasWidth:cthis.Canvas.CanvasWidth})
			cthis.gumbas.push({ID:GoombaID,Goomba:GoombaObject})
			cthis.CreateGoombas();
		},800)	
	}
};
mbase.prototype.DrawGoombas = function(){
	cthis = this;
	this.gumbas.forEach(function(ThisGumba){
		IsDeadorNot = ThisGumba.Goomba.Draw({on:cthis.Canvas.painter});
		if(IsDeadorNot){
			cthis.DeleteGoomba(ThisGumba.ID);
		};
	});
}

mbase.prototype.DeleteGoomba = function(GoombaID) {
	var DeadGoomba = this.gumbas.findIndex(x => x.ID === GoombaID);
	this.AmountCreated--;
	this.gumbas.splice(DeadGoomba, 1);
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

		//drawing player
		cthis.Player.Draw({on:cthis.Canvas.painter});

		//cthis.gumbas.first_gumba.Draw({on:cthis.Canvas.painter});
		//cthis.gumbas.second_gumba.Draw({on:cthis.Canvas.painter});
		cthis.DrawGoombas();
		requestAnimationFrame(implement_moment_in_time);
	};
	implement_moment_in_time();
};