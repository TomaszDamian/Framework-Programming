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

UserSubmissions.prototype.SubmitScore = function(){
	
};