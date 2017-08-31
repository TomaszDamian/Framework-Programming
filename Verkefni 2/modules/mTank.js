//object basic made
function mTank(args){
	this.id = args.id;
	this.x = 0;
	this.y = 0;
}
//tanks made		
var AorusTank = new mTank({id:'Aorus'});
//var PancakeTank = new mTank({id:'Pancake'});
//var CenzuoTank = new mTank({id:'Cenzuo'});

//Tank body made
var TankBody = document.createElement("DIV");
TankBody.id = "TankBody";
document.getElementById('Body').appendChild(TankBody);

var TankImage = document.createElement('IMG')
TankImage.id = "TankImage";
TankImage.src = "https://orig13.deviantart.net/8162/f/2015/152/3/1/8bit_sherman_profile__fixed__by_muddyfudger-d8vkkhy.gif";
document.getElementById('TankBody').appendChild(TankImage)

//Tank functions
mTank.prototype.move_right = function () {
	this.x += 1;	
	if(this.x >= 301){alert("you can't go any further")}	
	else{
		document.getElementById('TankBody').style.left = this.x + "px";
	}
};

mTank.prototype.move_left = function () {
	this.x -= 1;
	if(this.x <= 0){alert("you cant go any further")}
	else{
		document.getElementById('TankBody').style.left = this.x + "px";
	}
};

mTank.prototype.move_down = function () {
	this.y += 1;
	if(this.y >= 301){alert("you can't go any further")}
	else{
		document.getElementById('TankBody').style.top = this.y + "px";
	}
};

mTank.prototype.move_up = function () {
	this.y -= 1;
	if(this.y <= 0){alert("you cant go any further")}
	else{
		document.getElementById('TankBody').style.top = this.y + "px";
	}
};

mTank.prototype.Shoot = function () {
	alert(this.id + " is now shooting");
};

//print position
mTank.prototype.PrintPositon = function () {
	console.log(this.id + ': x = ' + this.x + ', y =' + this.y);
};

//find what key is being pressed and get their key code

document.onkeydown = key_pressed;

function key_pressed(event){
	var KeyPressed = event.code;
	var KeyNumber = event.keyCode;		//this gives the used the code for the pressed key
	//alert('key pressed ' + KeyPressed); //[KeyPressed.length-1] added behind KeyPressed to have only the letter without the "key" at the start
										//wont work for numpad and special symbols
	if(KeyNumber == 87){AorusTank.move_up();};
	if(KeyNumber == 65){AorusTank.move_left();};
	if(KeyNumber == 68){AorusTank.move_right();};
	if(KeyNumber == 83){AorusTank.move_down();};
	if(KeyNumber == 70){AorusTank.Shoot();};

};