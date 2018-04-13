//game is about 2 players that are trying to kill each.
//you can kill the other playing by drawing your color infront of them.
//if they crash into your trail then they die
//what I have done is movement, drawing and time.
//I still have to implement collisions and power ups.
//tested and written on/for chrome

window.onload = function () {
	this.Canvas = new Canvas();
	this.Time = new TimeInSeconds();
	this.FirstPlayer = new Player({Painter:this.Canvas.painter,playerNum:1});
	this.SecondPlayer = new Player({Painter:this.Canvas.painter,playerNum:2});
	this.FirstPlayer.AddToCollisionTrail();
	this.SecondPlayer.AddToCollisionTrail();

	CheckIfColorsAreTheSame(this.FirstPlayer.SelectedColor, this.SecondPlayer.SelectedColor);

	var colors = "colors";
	var cthis = this;
	var KeyHeld = false;
	FrameByFrame();
	
	function FrameByFrame(){
		this.Canvas.ClearCanvas();
		/*if(this.Time.Seconds <= 4){
			this.Canvas.ClearCanvas();
		}*/
		if(this.Time.Seconds < 4){
			this.FirstPlayer.DarwPlayerNumber();
			this.SecondPlayer.DarwPlayerNumber();
			this.FirstPlayer.DrawFront()
			this.SecondPlayer.DrawFront()
		}
		else{
			if(cthis.P1TurningRight){this.FirstPlayer.turnRight();}
			else if(cthis.P1TurningLeft){this.FirstPlayer.turnLeft();}
			if(cthis.P2TurningRight){this.SecondPlayer.turnRight();}
			else if(cthis.P2TurningLeft){this.SecondPlayer.turnLeft();}
		}
		this.FirstPlayer.DrawSelf();
		this.SecondPlayer.DrawSelf();
		

		requestAnimationFrame(FrameByFrame);
	}

	setInterval(function(){
		cthis.Time.OneSecondPassed();
	},1000);

	MovePlayers = setInterval(function(){
		if(cthis.Time.Seconds >= 4){
			cthis.FirstPlayer.MoveForward();
			cthis.SecondPlayer.MoveForward();
			this.FirstPlayer.AddToCollisionTrail();
			this.SecondPlayer.AddToCollisionTrail();
		}
	},24)
	document.onkeydown = function (event) {
		KeyPressed = event.keyCode;
		switch (KeyPressed) {
			//player 1 uses a and d
			case 68:
				cthis.P1TurningRight = true;
				break;
			case 65:
				cthis.P1TurningLeft = true;
				break;
			//player 2 uses left arrow key and right arrow key
			case 39:
				cthis.P2TurningRight = true;
				break;
			case 37:
				cthis.P2TurningLeft = true;
				break;
		}
	};
	document.onkeyup = function () {
		KeyPressed = event.keyCode;
		switch (KeyPressed) {
			case 68:
				cthis.P1TurningRight = false;
				break;
			case 65:
				cthis.P1TurningLeft = false;
				break;
			case 39:
				cthis.P2TurningRight = false;
				break;
			case 37:
				cthis.P2TurningLeft = false;
				break;
		}
	};
};