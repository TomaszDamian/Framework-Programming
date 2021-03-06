//disclaimer I do not own/make the code for collision detections and User submissions
//I also did get some help with how to draw the Enemies on screen but everything else is made by me

function mbase(){
	//this makes it possible to call all the functions withing the master class
	this.Canvas = new CreateCanvas({heigth:650,width:900});
	this.Player = new Player({x:0,y:650,heigth:100,width:65,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png",Score:0});
	this.detectCollision = new CollisionDetection({});
	this.UserScores = new UserSubmissions();

	this.moveup = false;
	this.movedown = false;
	this.moveleft = false;
	this.moveright = false;
	this.GamePlaying = false;
	this.GameOver = false;
	
	this.AmountCreated = 0;
	this.AmountDead = 0;
	//softcaps at 160
	this.Timer = 600; 
	//softcap the amount of goombas to 1000 so it doesn't overload the whole system
	this.amountToCreate = 1000;
	this.gumbas=[];
};
 
mbase.prototype.DeleteEverything = function(){
	this.gumbas=[];
}

mbase.prototype.EnableSubmitInput = function(){
	var SubmitInput = document.getElementById('SubmitInput');
	SubmitInput.disabled = false;
};

mbase.prototype.DisableSubmitInput = function(){
	var SubmitInput = document.getElementById('SubmitInput');
	SubmitInput.disabled = true;
};

mbase.prototype.CreateGoombas = function(){
	cthis = this
	if(!cthis.GameOver){
		if(this.AmountCreated < this.amountToCreate){
			setTimeout(function() {
				cthis.AmountCreated++;
				var GoombaID = "goomba" + cthis.AmountCreated;
				GoombaObject = new Enemy({EnemyModleLink:"https://i.imgur.com/rsaFhHn.png",CanvasWidth:cthis.Canvas.CanvasWidth,width:50,heigth:50})
				cthis.gumbas.push({ID:GoombaID,Goomba:GoombaObject})
				cthis.CreateGoombas();
			},cthis.Timer)	
		}
		else{
			cthis.CreateGoombas();
		};
	}
	else{
		cthis.EnableSubmitInput();
		cthis.DeleteEverything();
		cthis.UserScores.isClicked = false;
		cthis.UserScores.GetScore({ScoreSubmitted:cthis.Player.PlayerScore});
	};
};

mbase.prototype.DetectHit = function(){
	var cthis = this;
	this.gumbas.forEach(function(CurrentGoomba){
		var HitDetected = cthis.detectCollision.PlayerCollision({
			Goomba:CurrentGoomba.Goomba,
			Player:cthis.Player
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
	this.DifficultyCurve();
};

mbase.prototype.DifficultyCurve = function(){
	if(this.AmountDead === 10){
		this.Timer -= 50
		this.AmountDead = 0;
		if(this.Timer < 160){
			this.Timer = 160
		}
	}
}

mbase.prototype.onload = function() {
	var cthis = this;

	cthis.UserScores.CreateScoreSubmission();
	cthis.UserScores.GetDataForLeaderboard();
	cthis.UserScores.GetDataEvery10Seconds();
	//this is for onkeydown
	//detects if a key was pressed
	document.onkeydown = function(event){
		KeyPressed = event.keyCode
		switch (KeyPressed) {
			case 87:
				if(!cthis.UserScores.CanvasIgnored){
					cthis.moveup = true;
				}
			break;
			
			case 83:
				if(!cthis.UserScores.CanvasIgnored){
					cthis.movedown = true;
				}
			break;

			case 65:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.moveleft = true;
			}
			break;

			case 68:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.moveright = true;
			}
			break;

			case 13:
			if(!cthis.UserScores.CanvasIgnored){
				if(!cthis.GamePlaying){
					cthis.GamePlaying = true;
					cthis.GameOver = false;
					cthis.CreateGoombas();
				};
			}
			break;

			case 82:
			if(!cthis.UserScores.CanvasIgnored){
				if(cthis.GameOver){
					cthis.GameOver = false;
					cthis.Player.hitPoints = 3;
					cthis.Player.PlayerScore = 0;
					cthis.CreateGoombas();
					cthis.DisableSubmitInput();
				}
			}
		};
	};
	//same as above but it detects when a button is released
	document.onkeyup = function(event){
		KeyPressed = event.keyCode
		switch (KeyPressed) {
			case 87:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.moveup = false;
			}
				break;
			case 83:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.movedown = false;
			}
				break;

			case 65:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.moveleft = false;
			}
				break;

			case 68:
			if(!cthis.UserScores.CanvasIgnored){
				cthis.moveright = false;
			}
				break;
		};
	};
	function implement_moment_in_time(){
		if(cthis.moveup){cthis.Player.ypos -= 7;};	
		if(cthis.movedown){cthis.Player.ypos += 7;};
		if(cthis.moveleft){cthis.Player.xpos -= 7};
		if(cthis.moveright){cthis.Player.xpos += 7};
		//clearing canvas
		cthis.Canvas.clearCanvas();
		cthis.Canvas.clearStatCanvas();

		cthis.detectCollision.borderCollison({
			PlayerXpos:cthis.Player.xpos,
			PlayerYpos:cthis.Player.ypos,
			PlayerWidth:cthis.Player.width,
			PlayerHeigth:cthis.Player.heigth,
			theplayer:cthis.Player,
			CanvasWidth:cthis.Canvas.CanvasWidth,
			CanvasHeigth:cthis.Canvas.CanvasHeigth,
		});

		if(!cthis.GamePlaying){
			cthis.Canvas.DrawMainMenu();
		};
		if(cthis.GameOver){
			cthis.Canvas.DrawGameOver();
		}

		if(cthis.Player.hitPoints <= 0){
			cthis.GameOver = true;
		}

		

		cthis.DetectHit();
		//drawing player
		cthis.Player.Draw({on:cthis.Canvas.painter});
		cthis.Player.DrawStats({on:cthis.Canvas.StatPainter});

		//cthis.gumbas.first_gumba.Draw({on:cthis.Canvas.painter});
		//cthis.gumbas.second_gumba.Draw({on:cthis.Canvas.painter});
		cthis.DrawGoombas();
		cthis.DetectHit();
		requestAnimationFrame(implement_moment_in_time);
		
	};
	implement_moment_in_time();
};