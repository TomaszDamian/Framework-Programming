//variables that make toggling possible
var SepiaActive = false;
var BlackAndWhiteActive = false;
var RedAndwhiteActive = false;
var isBlurred = false;
var GradualBlackActive = false;
var RedTitle = false;
var ChangeSubtitle = false;
var Ypercentage = 1;

var button=document.createElement('button');
button.style.top=370;
button.style.left=60;
button.style.padding="10px";
button.style.border="none";
button.className="NotActive"
button.style.margin="0px 5px 0px 0px";
button.style.cursor="pointer";
button.innerHTML='Sepia filter';
//I am so sure you can do this in some other way that is way more efficient
//but I just have no idea how I could do it other than this
button.addEventListener('click',function(){
	SepiaActive = !SepiaActive;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = false;
	GradualBlackActive = false;
	RedTitle = false;
	ChangeSubtitle = false;
	RecolorButtons();
});

var button2 = document.createElement('button');
button2.style.top=370;
button2.style.left=60;
button2.style.padding="10px";
button2.className="NotActive"
button2.style.margin="0px 5px 0px 0px";
button2.style.border="none";
button2.style.cursor="pointer";
button2.innerHTML='Black and white';
button2.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = !BlackAndWhiteActive;
	RedAndwhiteActive = false;
	GradualBlackActive = false;
	RedTitle = false;
	ChangeSubtitle = false;
	RecolorButtons();
});

var button3 = document.createElement('button');
button3.style.top=370;
button3.style.left=60;
button3.style.padding="10px";
button3.className="NotActive"
button3.style.margin="0px 5px 0px 0px";
button3.style.border="none";
button3.style.cursor="pointer";
button3.innerHTML='Make red';
button3.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = !RedAndwhiteActive;
	GradualBlackActive = false;
	RedTitle = false;
	ChangeSubtitle = false;
	RecolorButtons();
});

var button4 = document.createElement('button');
button4.style.top=370;
button4.style.left=60;
button4.style.padding="10px";
button4.className="NotActive"
button4.style.border="none";
button4.style.cursor="pointer";
button4.style.margin="0px 5px 0px 0px"
button4.innerHTML='Blur video';
button4.addEventListener('click',function(){
	isBlurred = !isBlurred;
	RedTitle = false;
	ChangeSubtitle = false;
	RecolorButtons();
});

var button5 = document.createElement('button');
button5.style.top=370;
button5.style.left=60;
button5.style.padding="10px";
button5.className="NotActive"
button5.style.border="none";
button5.style.cursor="pointer";
button5.style.margin="0px 5px 0px 0px"
button5.innerHTML='Gradual Black and white';
button5.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = false;
	GradualBlackActive = !GradualBlackActive;
	RedTitle = false;
	ChangeSubtitle = false;
	RecolorButtons();
});

var button6 = document.createElement('button');
button6.style.top=370;
button6.style.left=60;
button6.style.padding="10px";
button6.className="NotActive"
button6.style.border="none";
button6.style.cursor="pointer";
button6.style.margin="0px 5px 0px 0px"
button6.innerHTML='Skip to red subtitle';
button6.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = false;
	GradualBlackActive = false;
	RedTitle = false;
	ChangeSubtitle = !ChangeSubtitle;
	if(ChangeSubtitle){
		SkipTo();
	}
	RecolorButtons();
});

var button7 = document.createElement('button');
button7.style.top=370;
button7.style.left=60;
button7.style.padding="10px";
button7.className="NotActive"
button7.style.border="none";
button7.style.cursor="pointer";
button7.style.margin="0px 5px 0px 0px"
button7.innerHTML='Skip to red title';
button7.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = false;
	GradualBlackActive = false;
	RedTitle = !RedTitle;
	ChangeSubtitle = false;
	if(RedTitle){
		SkipTo();
	}
	RecolorButtons();
});

//make the video.
var video=document.createElement('video');
video.style.position='absolute';
video.style.top=100;
video.style.left=200;
video.style.width=500;
video.src='video.mp4';
video.type='video/mp4';
video.muted=true;
video.volume = 0.3;
video.autoplay = true;
video.setAttribute("controls","controls");

//make the canvas.
var canvas=document.createElement('canvas');
canvas.style.position='absolute';
canvas.style.top=50;
canvas.style.left=10;
canvas.style.width=500;
canvas.style.height=300;
canvas.addEventListener("mousemove",FindPercentafeOfCanvas)
var canvasp=canvas.getContext('2d');

// once the video is ready.. set its dimenstions.
video.addEventListener('loadedmetadata',function() {set_canvas_dimensions();},false);


setInterval(function()  {paste_video_on_canvas();}, 10);

window.onload=function(){
    document.body.style.background='rgb(0,0,0)';
    document.body.appendChild(button);
    document.body.appendChild(button2);
    document.body.appendChild(button3);
    document.body.appendChild(button4);
    document.body.appendChild(button5);
    document.body.appendChild(button6);
    document.body.appendChild(button7);
    document.body.appendChild(canvas);
    }

function RecolorButtons(){
	if(SepiaActive){button.className = "Active";} else{button.className = "NotActive";};
	if(BlackAndWhiteActive){button2.className = "Active";} else{button2.className = "NotActive";};
	if(RedAndwhiteActive){button3.className = "Active";} else{button3.className = "NotActive";};
	if(isBlurred){button4.className = "Active";} else{button4.className = "NotActive";};
	if(GradualBlackActive){button5.className = "Active";} else{button5.className = "NotActive";};
	if(ChangeSubtitle){button6.className = "Active";} else{button6.className = "NotActive";};
	if(RedTitle){button7.className = "Active";} else{button7.className = "NotActive";};
}

function FindPercentafeOfCanvas(event){
	//canvas is from 50 to 350 which makes 300 the 100%
	mouseY = event.clientY
	Ypercentage = (mouseY-50)/300
}

function set_canvas_dimensions(){
    var ratio=video.videoWidth/video.videoHeight;
    canvas.width=video.videoWidth;
    canvas.height=parseInt(canvas.width/ratio,10);
    }


function MakeBlackAndWhite(pixel_object, image_data){ 
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];

        //total of all colors
        var total = red+green+blue;
        
        //average brigthness of every pixel
        var pixel_average=(total/3);
        
        //change it to percantage
        var lignt_percantage = (pixel_average/255);

        var red_filtered_pixel = 255 * lignt_percantage;
        var green_filtered_pixel = 255 * lignt_percantage;
        var blue_filtered_pixel = 255 * lignt_percantage;
		
		pixel_object[cline+0]= red_filtered_pixel;
    	pixel_object[cline+1]= green_filtered_pixel;
    	pixel_object[cline+2]= blue_filtered_pixel;

	};
	return pixel_object;
}

function MakeRedAndWhite(pixel_object, image_data){
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];

        //total of all colors
        var total = red+green+blue;
        
        //average brigthness of every pixel
        var pixel_average=(total/3);
        
        //change it to percantage
        var lignt_percantage = (pixel_average/255);

        var red_filtered_pixel = 255 * lignt_percantage;
        var green_filtered_pixel = 0 * lignt_percantage;
        var blue_filtered_pixel = 0 * lignt_percantage;
		
		pixel_object[cline+0]= red_filtered_pixel;
    	pixel_object[cline+1]= green_filtered_pixel;
    	pixel_object[cline+2]= blue_filtered_pixel;

	};
	return pixel_object;
}

function MakeSepia(pixel_object, image_data){
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];

        //total of all colors
        var total = red+green+blue;
        
        //average brigthness of every pixel
        var pixel_average=(total/3);
        
        //change it to percantage
        var lignt_percantage = (pixel_average/255);

        var red_filtered_pixel = 180 * lignt_percantage;
        var green_filtered_pixel = 80 * lignt_percantage;
        var blue_filtered_pixel = 20 * lignt_percantage;
		
		pixel_object[cline+0]= red_filtered_pixel;
    	pixel_object[cline+1]= green_filtered_pixel;
    	pixel_object[cline+2]= blue_filtered_pixel;

	};
	return pixel_object;
}

function MakeBlurred(canvasp){
	canvasp.filter = "blur(3px)";
	return canvasp;
} function Unblur(canvasp){
	canvasp.filter = "blur(0px)";
	return canvasp;
}

function SkipTo(){
	if(ChangeSubtitle){
		video.currentTime = 20;
	};
	if(RedTitle){
		video.currentTime = 25;
	};
};

function MakeRedSubtitle(pixel_object, image_data){
	var Timestamp=video.currentTime;
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		if(Timestamp > 20 && Timestamp < 23){	
			var red=pixel_object[cline+0];
    		var green=pixel_object[cline+1];
    		var blue=pixel_object[cline+2];
    		var total = red+green+blue;
			
			if(total > 715){
                pixel_object[cline+0]= 255;
                pixel_object[cline+1]= 0;
                pixel_object[cline+2]= 0;
            };
		};
	};
	return pixel_object;
}

function MakeTitleRed(pixel_object, image_data){
	var Timestamp=video.currentTime;
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		if(Timestamp > 25 && Timestamp < 29){	
			var red=pixel_object[cline+0];
    		var green=pixel_object[cline+1];
    		var blue=pixel_object[cline+2];
    		var total = red+green+blue;
			
			if(total > 715){
                pixel_object[cline+0]= 255;
                pixel_object[cline+1]= 0;
                pixel_object[cline+2]= 0;
            };
		};
	};
	return pixel_object;
}

function MakeGradualBlack(pixel_object, image_data){
	var slot_quantity = image_data.data.length
	for(var cline=0;cline<slot_quantity;cline+=4){
		var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];

		//total of all colors
        var total = red+green+blue;
        
        //average brigthness of every pixel
        var pixel_average=(total/3);
        
        //change it to percantage
        var lignt_percantage = (pixel_average/255);
		
		//byrjum a ad gera okkur svarthvit.
    	var red_filtered_pixel = (255 * lignt_percantage);
    	var green_filtered_pixel = (255 * lignt_percantage);
    	var blue_filtered_pixel = (255 * lignt_percantage);
    	
    	//svo thurfum vid ad fatta.. hvernig rgb eru, midad vid svarthvitt.
    	//mismunur a r og svarthvitu birtunni.
    	var dr = (red-pixel_average);
    	var dg = (green-pixel_average);
    	var db = (blue-pixel_average);
    	//svo getum vid profad ad baeta thessu aftur a.. tha a thetta ad verda i lit.
		red_filtered_pixel+=(dr*Ypercentage);
		green_filtered_pixel+=(dg*Ypercentage);
		blue_filtered_pixel+=(db*Ypercentage);

		pixel_object[cline+0]= red_filtered_pixel;
    	pixel_object[cline+1]= green_filtered_pixel;
    	pixel_object[cline+2]= blue_filtered_pixel;
	};
	return pixel_object;
}

function paste_video_on_canvas(){
    canvasp.fillRect(0,0,canvas.width,canvas.height);
    canvasp.drawImage(video,0,0,canvas.width,canvas.height);   
    var image_data=canvasp.getImageData(0,0,500,500);
    var pixel_object=image_data.data;

    if(SepiaActive){pixel_object = MakeSepia(pixel_object, image_data)};
    
    if(BlackAndWhiteActive){pixel_object = MakeBlackAndWhite(pixel_object, image_data)};
    
    if(RedAndwhiteActive){pixel_object = MakeRedAndWhite(pixel_object, image_data)};
    
    if(isBlurred){canvasp = MakeBlurred(canvasp)}else{canvasp = Unblur(canvasp)};

    if(GradualBlackActive){pixel_object = MakeGradualBlack(pixel_object, image_data)};

    if(ChangeSubtitle){pixel_object = MakeRedSubtitle(pixel_object, image_data)};

    if(RedTitle){pixel_object = MakeTitleRed(pixel_object, image_data)}

    image_data.data=pixel_object;
    canvasp.putImageData(image_data,0,0);
}