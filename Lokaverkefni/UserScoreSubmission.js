function UserSubmissions(){}

UserSubmissions.prototype.CreateLeaderboard = function(){

};
UserSubmissions.prototype.CreateScoreSubmission = function(){
	var UserNameInput = document.createElement("input");
	UserNameInput.type = "text";
	UserNameInput.className = "input";
	UserNameInput.style.width = "500px";
	UserNameInput.disabled = true;
	document.getElementById('UserNameDiv').appendChild(UserNameInput)
};

UserSubmissions.prototype.SubmitScore = function(userName, userScore){
	if(!userName || !userScore)
		return;
		
	var data = new FormData();
	data.append("userName" , userName);
	data.append("userScore", userScore)
	var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	xhr.open( 'post', './Submit.php', true );
	xhr.send(data);
};