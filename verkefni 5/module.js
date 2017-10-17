window.onload=function(){
    document.title='JS-Canvas';

    //herna erum vid ad bua til canvasid og stilla staerdirnar a thvi.
    var ccanvas=document.createElement('canvas');
    ccanvas.style.position='absolute';
    ccanvas.style.top='0px';
    ccanvas.style.left='0px';
    ccanvas.width=500;
    ccanvas.height=500;
    ccanvas.style.zIndex='100';
    var slots_per_line = ccanvas.width*4;
    var slots_per_vertical_line = slots_per_line * ccanvas.height*4;

    //herna buum vid til hlutinn a canvasinu sem vid teiknum a.
    var ccanvasp=ccanvas.getContext("2d");
    ccanvasp.fillStyle="rgba(0,0,0,1)";
    ccanvasp.fillRect(0,0,500,500);
    
    //changes one pixes with x=positionX and y=PositionY
    ChangePixel = function(args){
        positionX = args.x;
        positionY = args.y;
        rgb = args.rgb;

        postitioning = ((slots_per_line)*positionY)+(positionX*4);
        image_data.data[postitioning] = rgb[0];
        image_data.data[(postitioning)+1] = rgb[1];
        image_data.data[(postitioning)+2] = rgb[2];


    };

    //changes from lines from y=StartingLine till y=TargetLine
    ChangeLines = function(args){
        StartingLine = args.StartingLine;
        TargetLine = args.EndingLine;
        if (StartingLine > TargetLine) {
            TargetLine = args.StartingLine
            StartingLine = args.EndingLine
        };
        var rgb=args.rgb;

        var starting_point = (slots_per_line)*StartingLine;
        var one_line_slot_quantity = (slots_per_line);
        var our_target_slot = (one_line_slot_quantity * TargetLine);


        for(i = starting_point; our_target_slot > i; i+=4){
            image_data.data[i] = rgb[0];
            image_data.data[i+1] = rgb[1];
            image_data.data[i+2] = rgb[2];
        };
    };

    //changes horizontal line
    ChangeLine = function(args){
        y = args.y;
        rgb = args.rgb;
        cline = (y*2000);
        AmountInOneLine = slots_per_line;
        clineStart = cline + AmountInOneLine;
        clineEnd = clineStart + (slots_per_line);
        for (a = clineStart; a < clineEnd; a+=4){
            image_data.data[a+0] = rgb[0];
            image_data.data[a+1] = rgb[1];
            image_data.data[a+2] = rgb[2];
        };
    };

    //changes vertical line
    ChangeVerticalLine = function(args){
        x = args.x;
        cslot = x*4;
        rgb = args.rgb;
        //punktur 1
        //nu thurfum vid ad finna.. slot numerid a fyrsta punktinum.
        //var cslot=x*4.
        var begin_slot=(cslot);
        for(var cslot=begin_slot; cslot < slots_per_vertical_line; cslot+=slots_per_line){
            image_data.data[cslot+0]=rgb[0];
            image_data.data[cslot+1]=rgb[1];
            image_data.data[cslot+2]=rgb[2];
        };
    };

    //herna naum vid i gognin i canvasinu.
    var image_data=ccanvasp.getImageData(0,0,500,500);
    
    /*ChangePixel({x:100,y:100,rgb:[255,0,0]})
    ChangeLines({StartingLine:222,EndingLine:228,rgb:[128,0,15]})

    for(var i=350;i<500;i++){
        ChangeLine({y:i,rgb:[127,0,127]});
    };
    
    for(var x = 10; x < 20; x++){
        ChangeVerticalLine({x:x,rgb:[255,0,0]});
    };*/

    //skellum gögnunum aftur í canvasið.
    ccanvasp.putImageData(image_data,0,0);

    //skellum canvasinu í dom-ið.
    document.body.appendChild(ccanvas);

    var cslot = 0;
    Rcolor = 0;
    Gcolor = 100;
    Bcolor = 200;
    DecreaseRcolor = true;
    DecreaseGcolor = true;
    DecreaseBcolor = true;
    function implement_moment_in_time(){
        cslot+=4;
        //ChangeLines({StartingLine:222,EndingLine:228,rgb:[128,0,15]})
 
        //for(var cslot=0;cslot<slots_per_vertical_line;cslot+=4){
            image_data.data[cslot+0]=Rcolor;
            image_data.data[cslot+1]=Gcolor;
            image_data.data[cslot+2]=Bcolor;
        //}
        if(Rcolor === 255){
            DecreaseRcolor = false;
        }else if(Rcolor === 0){
            DecreaseRcolor = true;
        }
        
        if(Gcolor === 255){
            DecreaseGcolor = false;
        }else if(Gcolor === 0){
            DecreaseGcolor = true;
        }

        if(Bcolor === 255){
            DecreaseBcolor = false;
        }else if(Bcolor === 0){
            DecreaseBcolor = true;
        }

        if(DecreaseRcolor){
            Rcolor++;
        }else{
            Rcolor--;
        }

        if(DecreaseGcolor){
            Gcolor++;
        }else{
            Gcolor--;
        }

        if(DecreaseBcolor){
            Bcolor++;
        }else{
            Bcolor--;
        }
        
        //some code here.
        //skellir gögnunum aftur á canvasið:
        ccanvasp.putImageData(image_data,0,0);
        //lætur örgjörvann keyra þetta fall aftur við næsta hentuga tækifæri.
        requestAnimationFrame(implement_moment_in_time);
    }
    implement_moment_in_time();
};