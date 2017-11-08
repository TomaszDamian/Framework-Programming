//variables that make toggling possible
var SepiaActive = false;
var BlackAndWhiteActive = false;
var RedAndwhiteActive = false;
var isBlurred = false;

var button=document.createElement('button');
button.style.top=370;
button.style.left=60;
button.style.padding="10px";
button.style.border="none";
button.style.background="red";
button.style.margin="0px 5px 0px 0px";
button.style.cursor="pointer";
button.innerHTML='Sepia filter';\
//I am so sure you can do this in some other way that is way more efficient
//but I just have no idea how I could do it other than this
button.addEventListener('click',function(){
	SepiaActive = !SepiaActive;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = false;
});

var button2 = document.createElement('button');
button2.style.top=370;
button2.style.left=60;
button2.style.padding="10px";
button2.style.background="red";
button2.style.margin="0px 5px 0px 0px";
button2.style.border="none";
button2.style.cursor="pointer";
button2.innerHTML='Black and white';
button2.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = !BlackAndWhiteActive;
	RedAndwhiteActive = false;
});

var button3 = document.createElement('button');
button3.style.top=370;
button3.style.left=60;
button3.style.padding="10px";
button3.style.background="red";
button3.style.margin="0px 5px 0px 0px";
button3.style.border="none";
button3.style.cursor="pointer";
button3.innerHTML='Make red';
button3.addEventListener('click',function(){
	SepiaActive = false;
	BlackAndWhiteActive = false;
	RedAndwhiteActive = !RedAndwhiteActive;
});
var button4 = document.createElement('button');
button4.style.top=370;
button4.style.left=60;
button4.style.padding="10px";
button4.style.background="red";
button4.style.border="none";
button4.style.cursor="pointer";
button4.style.margin="0px 5px 0px 0px"
button4.innerHTML='Blur video';
button4.addEventListener('click',function(){isBlurred = !isBlurred});

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

/*//make the image.
var image=document.createElement('img');
image.style.position='absolute';
image.style.top=400;
image.style.left=200;
image.style.width=500;
image.style.height=280;
image.style.zIndex=-5;
image.src='1.jpg';*/

//make the canvas.
var canvas=document.createElement('canvas');
canvas.style.position='absolute';
canvas.style.top=400;
canvas.style.left=200;
canvas.style.width=500;
//canvas.style.backgroundColor='rgb(222,222,222)';
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
    document.body.appendChild(video);
    document.body.appendChild(canvas);
    /*document.body.appendChild(image);*/
    }

//
function set_canvas_dimensions(){
    var ratio=video.videoWidth/video.videoHeight;
    canvas.width=video.videoWidth;
    canvas.height=parseInt(canvas.width/ratio,10);
    }
function paste_video_on_canvas(){

    //her faum vid sekunduna sem vid erum a innan i videoinu.
    var second_in_video=video.currentTime;
    //einnig er haegt ad lata videoid faerast med thvi ad gera:
    //video.currentTime=33;



    //set the size of the rectangle that will be filled and draw the image onto the canvas.
    canvasp.fillRect(0,0,canvas.width,canvas.height);
    canvasp.drawImage(video,0,0,canvas.width,canvas.height);
    
    var image_data=canvasp.getImageData(0,0,500,500);

    var pixel_object=image_data.data;
    var slot_quantity=image_data.data.length;
    for(var cline=0;cline<slot_quantity;cline+=4){
        //getting rgba values of one pixel from one 2d list
        //one pixel is 4 different objects in the image_data list
        //that said first pixel starts on 0 second on 4 third on 8 and so on
        //that is what the for loop is doing for me and all I do is just get the values manually
        //by doing +0,+1,+2 and +3
        //0 being red, 1 being green, 2 being blue and 3 being apacity/opacity 
        var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];
        var opacity=pixel_object[cline+3];
       
        var total = red+green+blue;
        
        //average brigthness of every pixel
        var pixel_average=(total/3);
        
        //change it into percantage
        var lignt_percantage = (pixel_average/255);

        //insert the other color you want the image to be
        
        //Make movie red
        //explanation below
        if(RedAndwhiteActive){
	        var red_filtered_pixel = 255 * lignt_percantage
	        var green_filtered_pixel = 0 * lignt_percantage
	        var blue_filtered_pixel = 0 * lignt_percantage
        }

        //sepia filter
        //explanation below
        if(SepiaActive){
       		var red_filtered_pixel = 180 * lignt_percantage
        	var green_filtered_pixel = 80 * lignt_percantage
        	var blue_filtered_pixel = 20 * lignt_percantage
        }

        //Black and white
        //black is 255,255,255 and white is 0,0,0
        //you basically input the highest value you want the pixel to be
        //as the number that I'll call x so it would go x*light_percantage
        if(BlackAndWhiteActive){
        	var red_filtered_pixel = 255 * lignt_percantage
        	var green_filtered_pixel = 255 * lignt_percantage
        	var blue_filtered_pixel = 255 * lignt_percantage
        }
        //toggles between true and false turning it on an off will work with any filter
        if(isBlurred){
        	canvasp.filter = 'blur(3px)'
    	}
    	else{
        	canvasp.filter = 'blur(0px)'
    	}

        //this is basically done to be able to append the filtered pixels instead of the unfiltered ones
        if(BlackAndWhiteActive || SepiaActive || RedAndwhiteActive){
        	pixel_object[cline+0]= red_filtered_pixel;
        	pixel_object[cline+1]= green_filtered_pixel;
        	pixel_object[cline+2]= blue_filtered_pixel;
    	}
    	else{
    		pixel_object[cline+0]= red;
        	pixel_object[cline+1]= green;
        	pixel_object[cline+2]= blue;
    	}
        //both of the below will not work if any filter is on the canvas so be wary of that
        //change the first subtitles
        
        if(second_in_video > 20 && second_in_video < 23){
            //if the total of the pixel is over 715 which is as far as I could push it without
            //coloring the background red, then you make it red.
            //on the other title it has a fading effect thats becuase the title fades into white
            //which means that it comes to the total of 715 per pixel gradually, dont worry its a feature.. kinda
            if(total > 715){
                pixel_object[cline+0]= 255;
                pixel_object[cline+1]= 0;
                pixel_object[cline+2]= 0;
            }
        }
        //change big buck bunny title
        
        if(second_in_video > 25 && second_in_video < 29){
            if(total > 715){
                pixel_object[cline+0]= 255;
                pixel_object[cline+1]= 0;
                pixel_object[cline+2]= 0;
            }
        }

        //1. reyna ad meta, hversu bjartur thessi punktur er.
        //endum med, t.d. 0.23
        //2. nu viljum vid breyta thessu birtustigi,
        //i birtustig i litrofinu okkar.
        //thetta nyja litrof okkar, er a bilinu, 0,0,0 (svartur)
        //til (143,43,43).
        //thannig ad vid latum bara punktinn, fa..
        //hlutfallid af
        }
    image_data.data=pixel_object;

    canvasp.putImageData(image_data,0,0);
    }
