//need to be here for the append to not give me errors.
window.onload = function(){	
	//canvas and ctx made into global variable because they are used a heck ton
	var canvas=document.createElement('canvas');
	var ctx = canvas.getContext("2d");

	//making canvas and appending it into the html
	canvas.id='thecanvas';
	canvas.width='900';
	canvas.height='500';
	canvas.style.border='1px solid red';
	document.body.appendChild(canvas)


	//I kinda want to split all the fucntions into files
	//so it doesnt get too cluttered
	//player class into one and then enemy class into another
	//then a file with all the universal classes that go like /*function function(x){}*/
	//then have one master .js file that compiles all of them making it easy to read.
	//will look into it soon
	//this is a class for the player defining
	Player = function(args){
		var xpos = args.x;
		var ypos = args.y;
		var hitPoints = args.hp;
		var PlayerModelLink = args.PlayerModelLink
	}
	
	Player.prototype.Draw = function(first_argument) {
		
	};
	
	function canvasClear(){
		//made to just clear the canvas so the tanks could be redrawn
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	//RAF is much lighter on the cpu and thats why I'm using that instead of a setTimeout
	function implement_moment_in_time(){
	
	CanvasClear();
	Player.Draw();

	//this just call the RAF again and it proccesses when it can
	requestAnimationFrame( implement_moment_in_time);
	};
	implement_moment_in_time();
	//calling this player class once in the begging
	Player({x:250,y:250,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png"})
};
//https://i.imgur.com/rsaFhHn.png link to the enemy model
