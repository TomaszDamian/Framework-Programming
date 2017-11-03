//you need to run all this code on a wamp server or any other type of server
/*button.
var button=document.createElement('button');
button.style.position='absolute';
button.style.top=370;
button.style.left=60;
button.id='snap';
button.innerHTML='Take Snapshot';
button.addEventListener('click',function(e) {paste_video_on_canvas();});*/
var counter = 0
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
    //document.body.appendChild(button);
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
        var red=pixel_object[cline+0];
        var green=pixel_object[cline+1];
        var blue=pixel_object[cline+2];
        var opacity=pixel_object[cline+3];
        
        //average brigthness of every pixel
        var pixel_average_brightness=((red+green+blue)/3);
        
        //change it into percantage
        var lignt_percantage = (pixel_average_brightness/255);

        //insert the other color you want the image to be
        
        //Make movie red
        /*
        var red_filtered_pixel = 255 * lignt_percantage
        var green_filtered_pixel = 0 * lignt_percantage
        var blue_filtered_pixel = 0 * lignt_percantage
        */

        //sepia filter
        /*
        var red_filtered_pixel = 180 * lignt_percantage
        var green_filtered_pixel = 80 * lignt_percantage
        var blue_filtered_pixel = 20 * lignt_percantage
        */

        //Black and white
        /*
        var red_filtered_pixel = 255 * lignt_percantage
        var green_filtered_pixel = 255 * lignt_percantage
        var blue_filtered_pixel = 255 * lignt_percantage
        */
        
        //make Movie blurry at 30 sec till 60 sec
        if (second_in_video > 30 && second_in_video < 60){
            canvasp.filter = 'blur(3px)'
        }
        else{
            canvasp.filter = 'blur(0px)'
        }


        

        pixel_object[cline+0]= red_filtered_pixel;
        pixel_object[cline+1]= green_filtered_pixel;
        pixel_object[cline+2]= blue_filtered_pixel;
        //165,42,42

        //1. reyna ad meta, hversu bjartur thessi punktur er.
        //endum med, t.d. 0.23
        //2. nu viljum vid breyta thessu birtustigi,
        //i birtustig i litrofinu okkar.
        //thetta nyja litrof okkar, er a bilinu, 0,0,0 (svartur)
        //til (143,43,43).
        //thannig ad vid latum bara punktinn, fa..
        //hlutfallid af


        /*
        if(blue>226 && total > 200){
            pixel_object[cline+3]=0;
        }
        pixel_object[cline+0]=((pixel_object[cline-40]+pixel_object[cline+40])/2);
        pixel_object[cline+1]=((pixel_object[cline-39]+pixel_object[cline+41])/2);
        pixel_object[cline+2]=((pixel_object[cline-38]+pixel_object[cline+42])/2);
        */
        }
    image_data.data=pixel_object;

    canvasp.putImageData(image_data,0,0);
    }
