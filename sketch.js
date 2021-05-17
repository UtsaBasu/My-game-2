var back;
var bg;
var edges;
var score=0;
var PLAY=2;
var END=1;
var gamestate=PLAY;



function preload() {
   backimg = loadImage("Road.png");
   dmdimg = loadImage("coin.png");
   grimg= loadAnimation("gran2.png","gran3.png","gran4.png")
   alimg = loadImage("alien.png");
   al2img = loadImage("alien2.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
  bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg.addImage(backimg);
  bg.scale=0.8;

  gr = createSprite(100,height/2);
  gr.addAnimation("run",grimg);

  dmdgrp=new Group();
  aliengroup=new Group();
 
  bg.velocityX=-6;
 
   edges= createEdgeSprites();
  
}

function draw(){
   // background(76,77,79)
   background("white")
   if(bg.x<0){
       bg.x=windowWidth/2
   }

   if (gamestate===PLAY){

   diamond();

 

    //strokeWeight(4);
    if(dmdgrp.isTouching(gr)){
        dmdgrp.get(0).destroy();
        score=score+1;

    }

    if(keyDown("UP_ARROW")){
        gr.y=gr.y-15;
    }
    if(keyDown("DOWN_ARROW")){
        gr.y=gr.y+15;
    }

    aliens();

    gr.bounceOff(edges);
}

if(aliengroup.isTouching(gr)){
    gamestate=END;
}

else if (gamestate===END){
    dmdgrp.destroyEach();
    aliengroup.destroyEach();

    bg.velocityX=0;

     aliengroup.setVelocityXEach(0);
     dmdgrp.setVelocityXEach(0);

}
   
    drawSprites();
    textSize(30);
    fill("pink");
    text("SCORE : "+score,windowWidth-300,50);
}

function diamond(){
    if(frameCount%30===0){
        dmd=createSprite(600,Math.round(random(150,width-150)));
        dmd.addImage(dmdimg);
        dmd.scale=0.1;
        dmd.velocityX=-6;
        dmdgrp.add(dmd);
        dmd.lifetime=80
    
    }
}

function aliens(){
    if(World.frameCount%120===0){
      aliensprite=createSprite(Math.round(random(450,950)),Math.round(random(50,windowHeight-200)),20,20);
      aliensprite.scale=0.3;
      
      r=Math.round(random(1,2));
      if (r===1){
        aliensprite.addImage(alimg);
      }
      else if (r===2){
        aliensprite.addImage(al2img);
      }
      
      aliensprite.y=Math.round(random(100,300));
      aliensprite.velocityX=-(8+(score/10));
      aliensprite.lifetime=80;
      
      aliengroup.add(aliensprite);
  
    }
  }




/*async function time(){
var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responsejson = await response.json();
console.log(responsejson);
var datim = responsejson.datetime;
console.log(datim);
var hour = datim.slice(11,13);

if(hour<=19&&hour>=06){
  var bg="sprites/bg.png";
  console.log("hi");
}
else{
    bg="sprites/bg2.jpg";
    console.log("bye");
}

backgroundImg=loadImage(bg);
}*/
