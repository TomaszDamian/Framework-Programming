function mbase(){
	this.Canvas = new CreateCanvas();
	this.Player = new Player({x:250,y:250,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png"});
	//this.Enemy = new Enemy({EnemyModleLink:https://i.imgur.com/rsaFhHn.png})

};

mbase.prototype.onload = function() {
	var cthis = this;
	
	//this is for onkeydown
	//detects if a key was pressed
	document.onkeydown = function(event){
		KeyPressed = 
	}

	function implement_moment_in_time(){
		//clearing canvas
		cthis.Canvas.clearCanvas();

		//drawing player
		cthis.Player.Draw({on:cthis.Canvas.painter});

		requestAnimationFrame(implement_moment_in_time);
	};
	implement_moment_in_time();
};
