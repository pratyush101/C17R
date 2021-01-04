var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var bananaScore =0;

function preload(){
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(40,200,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  
    
  ground = createSprite(300,300,600,10);
  ground.scale = 1;
  
  bananaScore=0;
  score = 0;
  
}


function draw() {
  background("orange");
   
  text("SURVIVAL TIME: "+score, 470, 20);
  text("bananas score - "+ bananaScore,470,40);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    survivalTime=Math.ceil(frameCount/frameRate());
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 250) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (bananaGroup.isTouching(monkey)){
      bananaScore=bananaScore+1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
   
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   
    
  
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(ground);
}
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,130, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.setCollider("rectangle",0,0,10,10)
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,270,50,50);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.setCollider("rectangle", 0, 0,10,10);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}
