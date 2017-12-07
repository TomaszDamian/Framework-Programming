function UserSubmissions(){
	this.FinalScore = 0;
	this.CanvasIgnored = false;
	this.isClicked = false;
}

UserSubmissions.prototype.GetDataEvery10Seconds = function(){
	var cthis = this
	setTimeout(function(){
		$.ajax({
			url: "userScores.json",
			dataType:"json",
			success: function(result){
				cthis.CreateLeaderboard(result);
				cthis.GetDataEvery10Seconds();
			},
			error: function(xhr,status,error){
			}
		});
	},10000)
}

UserSubmissions.prototype.GetDataForLeaderboard = function(){
	var cthis = this
	$.ajax({
		url: "userScores.json",
		dataType:"json",
		success: function(result){
			cthis.CreateLeaderboard(result);
		},
		error: function(xhr,status,error){
		}
	});
};

UserSubmissions.prototype.CreateLeaderboard = function(Scores){
	var SortedByValue = Scores.sort(function(a, b) {
    	return b.score - a.score;
	});
	var Couter = 0
	$("#Leaderboard").html("")
	var Header = $("<h1 class='title is-5'> Leaderboard: </h1>")
	$("#Leaderboard").append(Header)
	for(var Score in SortedByValue){
		UserRank = Couter+1;
		var RankNameScore = $("<p>"+ UserRank + ". " + SortedByValue[Couter].user + " : " + SortedByValue[Couter].score + " </p>")
		$("#Leaderboard").append(RankNameScore)
		Couter++
		if(Couter > 9){
			break;
		}
	} 
};

UserSubmissions.prototype.GetScore = function(args){
	this.FinalScore = args.ScoreSubmitted;
}

UserSubmissions.prototype.IgnoreCanvas = function(){
	this.CanvasIgnored = true;
}

UserSubmissions.prototype.reActivateCanvas = function(){
	this.CanvasIgnored = false;
}

UserSubmissions.prototype.CreateScoreSubmission = function(){
	var UserNameInput = document.createElement("input");
	UserNameInput.type = "text";
	UserNameInput.className = "input";
	UserNameInput.id = "SubmitInput";
	UserNameInput.style.width = "650px";
	UserNameInput.disabled = true;
	document.getElementById('UserNameDiv').appendChild(UserNameInput)

	var SubmitButton = document.createElement("button");
	SubmitButton.className = "button is-link";
	SubmitButton.innerHTML = "Submit";
	
	//thank you Arne for showing me how to avoide returning the tag as this when handling eventlistners
	//https://github.com/enra4
	SubmitButton.addEventListener("click", () => {
    	this.GetScoreAndName()
	});

	UserNameInput.addEventListener("focus", () => {
    	this.IgnoreCanvas()
	});

	UserNameInput.addEventListener("blur", () => {
    	this.reActivateCanvas()
	});

	document.getElementById('UserNameDiv').appendChild(SubmitButton)
};

UserSubmissions.prototype.GetScoreAndName = function(){
	var cthis = this
	var Input = document.getElementById('SubmitInput')
	var SubmitActive = Input.disabled
	var UserName = document.getElementById('SubmitInput').value;
	var FinalScore = this.FinalScore;
	if(!this.isClicked){
		if(!SubmitActive){
			if(UserName === ""){
				alert("Please insert a Name")
			}
			else{
				this.SubmitScore(UserName, FinalScore);
				this.isClicked = true;
				document.getElementById('SubmitInput').value = "";
				setTimeout(function(){
					cthis.GetDataForLeaderboard();
				},1100);
			};
		};
	}
	else{
		alert("you have alread submitted a score once restart to do it again");
	}
}

//Function written by Filip Ekström/Tromodolo
//https://github.com/Tromodolo/
UserSubmissions.prototype.SubmitScore = function(userName, userScore){
	if(!userName || !userScore)
		return;
		
	$.ajax({
		data: { "userName": userName, "userScore": userScore },
		url: 'submit.php',
		method: 'POST', 
		success: function() {
			console.log("Score Submitted");
		}
	});
};