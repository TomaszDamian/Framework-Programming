window.onload=function(){
	//canvas and ctx made into global variable because they are used a heck ton
	var canvas=document.createElement('canvas');
	var ctx = canvas.getContext("2d");

	//canvas made and then GameOver variable put on that to indicate the satate of the game
	canvas.id='thecanvas';
	canvas.width='1500';
	canvas.height='900';
	canvas.style.border='1px solid red';
	canvas.GameOver = false;
	//appends canvas to the html body
	document.body.appendChild(canvas);
	
	function canvasClear(){
		//made to just clear the canvas so the tanks could be redrawn
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	//collision detection
	DetectCollisionForTanks = function(){
		//honestly I dont really know what's going on here
		//my guess is that its calculating how much space the tank uses
		//and if the x and y values on them are the same then it detects it as a collision
		if (TankOne.x <= TankTwo.x + TankTwo.width &&
  			TankOne.x + TankOne.width >= TankTwo.x &&
   			TankOne.y <= TankTwo.y + TankTwo.height &&
   			TankOne.height + TankOne.y >= TankTwo.y){
				canvas.GameOver = true;
		};
		//https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
		//props to this guy who I took the code from
	}
	//Border collision detected
	DetectBorderCollision = function(){
		//when TankOne hits the canvas border then its game over
		if(TankOne.x + (TankOne.width/2) >= canvas.width){canvas.GameOver = true;};
		if(TankOne.x - (TankOne.width/2) <= 0){canvas.GameOver = true;};
		if(TankOne.y + (TankOne.height/2) >= canvas.height){canvas.GameOver = true;};
		if(TankOne.y - (TankOne.height/2) <= 0){canvas.GameOver = true;};
		//same thing repeated for TankTwo
		if(TankTwo.x + (TankTwo.width/2) >= canvas.width){canvas.GameOver = true;};
		if(TankTwo.x - (TankTwo.width/2) <= 0){canvas.GameOver = true;};
		if(TankTwo.y + (TankTwo.height/2) >= canvas.height){canvas.GameOver = true;};
		if(TankTwo.y - (TankTwo.height/2) <= 0){canvas.GameOver = true;};
	}

	tank = function(args){
		//args just take in the variables that are given to it by TankOne and TankTwo
		var x = args.x;
		var y = args.y;
		var width = args.width;
		var height = args.height;
		var ImageLink = args.ImageLink;
		var Direction = args.Direction
		img = new Image()
		img.src = ImageLink
		
		//redefining to this. to be able to use it in prototypes
		this.image = img
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.ImageLink = ImageLink;
		this.FacingDirection = Direction
		this.deg = 0
		this.angles_left_to_turn_left = 0
		this.angles_left_to_turn_right = 0
	}
	tank.prototype.Draw = function(args) {
		//Made it so there is no Clear canvas in the Draw function
		//Draw shouldn't also erase the canvas
		//GameOver explains itself pretty much its either true or false		
		if(canvas.GameOver){
			ctx.font="80px Georgia";
			ctx.fillText("Game over",200,200);
			ctx.fillText("Press 'R' to restart",90,400);
		}
		//if GameOver is false then it just draws everything normally
		else{
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.deg*Math.PI/180);
			//-(height/2) and -(width/2) used to find the center point of the tank
			ctx.drawImage(this.image,-(this.height/2),-(this.width/2),this.height,this.width);
			ctx.translate(0,0);
			ctx.restore();
		}
	};
	tank.prototype.rotateLeft = function() {
		//rotates the tank 15° every time its run
		//you can increase and decrease this.
		//but if you do make sure to change
		//Tankx.angles_left_to_turn_x to make it so it turns exactly 90°
		this.deg += 15;
	};
	tank.prototype.rotateRight = function() {
		this.deg -= 15;
	};
	tank.prototype.moveForward = function() {
		//https://i.imgur.com/xI9DdKz.png
		//reference as to what direction is forward
		//basically there is a variable thats defined over and over when you turn.
		if(this.FacingDirection === 0){
			this.x += 10;
		}
		else if(this.FacingDirection === 1){
			this.y += 10;
		}
		else if(this.FacingDirection === 2){
			this.x -= 10;
		}
		else if(this.FacingDirection === 3){
			this.y -= 10;
		}
	};
	tank.prototype.moveBackwards = function() {
		if(this.FacingDirection === 0){
			this.x -= 10;
		}
		else if(this.FacingDirection === 1){
			this.y -= 10;
		}
		else if(this.FacingDirection === 2){
			this.x += 10;
		}
		else if(this.FacingDirection === 3){
			this.y += 10
		}
	};
	tank.prototype.implement_physical_laws = function() {
		//If the Tank still has Angles_lef_to_turn_x.
		//decrease Angels_left_to_turn_x and,
		//increase/decrease this.deg by calling this.rotateLeft/right();.
		if(this.angles_left_to_turn_left != 0){
			this.angles_left_to_turn_left -= 1;
			this.rotateLeft();
		};
		//works the same as the one above.
		//this one just makes it rotate to the right
		if(this.angles_left_to_turn_right != 0){
			this.angles_left_to_turn_right -= 1;
			this.rotateRight();
		};
	};
	//Objects made over here, all of the variables here are needed
	TankOne = new tank({x:100,y:100,width:100,height:100,ImageLink:"https://i.imgur.com/CThAYu5.png",Direction:0});
	TankTwo = new tank({x:500,y:500,width:100,height:100,ImageLink:"https://i.imgur.com/BCBxoC1.png",Direction:2});
	
	//setTimeout to let the image load before drawing it
	//setTimeout can be increase if someone has worse internet.
	//simply by editing the number at the end (I marked the number)
	setTimeout(function(){
		setInterval(function(){
			
			//collision detection
			DetectCollisionForTanks();
			DetectBorderCollision();
			
			//clear canvas..
			canvasClear();
			
			//Draw the Tanks on the canvas..
			TankOne.Draw();
			TankTwo.Draw();

			//turning made possible
			TankOne.implement_physical_laws()
			TankTwo.implement_physical_laws()

			// forward and backwards movement
			if(TankOne.ForwardPedalDown){
				TankOne.moveForward();
			} 
			if(TankOne.BackwardsPedalDown){
				TankOne.moveBackwards();
			} 
			if(TankTwo.ForwardPedalDown){
				TankTwo.moveForward();
			} 
			if(TankTwo.BackwardsPedalDown){
				TankTwo.moveBackwards();
			}

			//Side to side animations
			if(TankOne.TurningRight && TankOne.angles_left_to_turn_right === 0){
				TankOne.angles_left_to_turn_right = 6;
				TankOne.FacingDirection -=1
				if(TankOne.FacingDirection === -1){
					TankOne.FacingDirection = 3
				};
				
			} else if(TankOne.TurningLeft && TankOne.angles_left_to_turn_left === 0){
				TankOne.angles_left_to_turn_left = 6;
				TankOne.FacingDirection +=1
					if(TankOne.FacingDirection === 4){
						TankOne.FacingDirection = 0
					};
			} else if(TankTwo.TurningRight && TankTwo.angles_left_to_turn_right === 0){
				TankTwo.angles_left_to_turn_right = 6;
				TankTwo.FacingDirection -=1
				if(TankTwo.FacingDirection === -1){
					TankTwo.FacingDirection = 3
				};
				
			} else if(TankTwo.TurningLeft && TankTwo.angles_left_to_turn_left  === 0){
				TankTwo.angles_left_to_turn_left = 6;
				TankTwo.FacingDirection +=1
				if(TankTwo.FacingDirection === 4){
					TankTwo.FacingDirection = 0
				};
			
			}
		},25 /*runs again every 25ms*/);
	},200 /*< SetTimeout timer*/)

	document.onkeydown = keypressed;
	function keypressed(event) {
		KeyNumber = event.keyCode;	
		//decided to go with switch cases. 
		//Simply because its much more cleaner than a bunch of if statements
		//basically I made a buch of variables that are defined on onkeydown and onkeyup
		//onkey up simply switches them back to false	
		switch(KeyNumber){
			//a key
			case 65:
				//if statement for the code not to run again when
				if(TankOne.angles_left_to_turn_right === 0){
					TankOne.TurningRight = true;	
				};
				break;

			//d key
			case 68:
				if(TankOne.angles_left_to_turn_left === 0){
					TankOne.TurningLeft = true;	
				};
				break;

			//w key
			case 87:
				TankOne.ForwardPedalDown = true;		
				break;

			//s key
			case 83:
				TankOne.BackwardsPedalDown = true;			
				break;
			}
			//made 2 swtich cases 1 for each tank
			switch(KeyNumber){
			// left arrow
			case 37:
				if(TankTwo.angles_left_to_turn_right === 0){
					TankTwo.TurningRight = true;
				};
				break;
			
			//right arrow
			case 39:
				if(TankTwo.angles_left_to_turn_left === 0){
					TankTwo.TurningLeft = true;
				};
				break;

			//up arrow 
			case 38:
				TankTwo.ForwardPedalDown = true;
				break;

			//down arrow
			case 40:
				TankTwo.BackwardsPedalDown = true;
				break;


			//r key to restart the game
			case 82:
				if(canvas.GameOver){
				TankOne = new tank({x:100,y:100,width:100,height:100,ImageLink:"https://i.imgur.com/CThAYu5.png",Direction:0});
				TankTwo = new tank({x:500,y:500,width:100,height:100,ImageLink:"https://i.imgur.com/BCBxoC1.png",Direction:2});
				canvas.GameOver = false;
				}
				break;
		};
		
		document.onkeyup = KeyReleased;
		function KeyReleased(event){
			switch(event.keyCode){
				//this is events for player one
				//a key
				case 65:
					TankOne.TurningRight = false;
				//d key
				case 68:
					TankOne.TurningLeft = false;
					break;
				//w key
				case 87:
					TankOne.ForwardPedalDown = false;
					break;
				//s key
				case 83:
					TankOne.BackwardsPedalDown = false;
					break;
				}
				//this is events for player two
				switch(event.keyCode){
				//right arrow
				case 37:
					TankTwo.TurningRight = false;
					break;
				//left arrow
				case 39:
					TankTwo.TurningLeft = false;
					break;
				//up arrow
				case 38:
					TankTwo.ForwardPedalDown = false;
					break;
				//down arrow
				case 40:
					TankTwo.BackwardsPedalDown = false;
					break;	
			}
		}
	};
}