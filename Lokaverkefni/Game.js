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

	//this is a class for the player defining
	Player = function(args){
		var xpos = args.x;
		var ypos = args.y;
		var hitPoints = args.hp;
		var PlayerModelLink = args.PlayerModelLink
		
	}
	Player({x:250,y:250,hp:3,PlayerModelLink:"https://i.imgur.com/0njuM9y.png"})

	function implement_moment_in_time(){
	//some code here.
	//skellir gögnunum aftur á canvasið:
	//lætur örgjörvann keyra þetta fall aftur við næsta hentuga tækifæri.
	requestAnimationFrame( implement_moment_in_time);
	}
	implement_moment_in_time();
};
//enemy player model needs to be edited
//https://i.imgur.com/PpUf1Ih.png link to the 