var back;
var monkey , monkey_running,monkeyI;
var invisible,invisible2;
var  obstacle, obstacleI;
var fruits,fruit1,fruit2; 
var fruitG, obstacleG;
var over;
var score;
var gameState = "PLAY";
var END;
var ground;
var invisibleGroud;
var time=0;

function preload(){
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
                                "sprite_3.png","sprite_4.png","sprite_5.png",
                                "sprite_6.png","sprite_7.png","sprite_8.png");
  obstaceImage = loadImage("obstacle.png");
  fruit2 = loadImage("banana.png")
  
  reset=loadImage("Untitled.png")


}

function setup() {
   createCanvas(500,270);
 
  ground = createSprite(335,320,1350,200);
ground.shapeColor="green";
ground.depth= 100;

  
invisible_ground = createSprite(400,243,800,10);
invisible_ground.visible = false;
   
  monkey=createSprite(80,100,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.138;
  
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,400,500)
  
  invisible = createSprite(250,210,500,1);
  invisible.visible = false;
  
  invisible2 = createSprite(250,10,500,1);
  invisible2.visible = false;
  
  
  // score variables and groups
  obstacleGroup = new Group();
  fruitG = new Group();
  
  score = 0;
  
  over = createSprite(250,140,10,10);
       over.addImage(reset);
       over.scale = 0.1;
  
  
}
function draw() {
  background("lightgreen");
  
  console.log(monkey.y);
   
  if(gameState === "PLAY"){

    if(keyDown("space")&&monkey.y >=175 ) {
       monkey.velocityY = -12;
       }
     if(frameCount % 7 === 0){
      time+= 1;
    }
  
    if(monkey.isTouching(fruitG)){
      score=score+5;
       fruitG.destroyEach();
    }
  
    if(monkey.isTouching(obstacleGroup)){
       gameState = END;
    }
    over.visible=false;
      
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisible);
    monkey.collide(invisible2);
    
    obstacles();
    spawnFruit();
  }
  
 else if(gameState === END){
       monkey.velocityY = 0;
       obstacleGroup.setVelocityXEach(0);
       fruitG.setVelocityXEach(0);
   over.visible=true;
  }
  
  if (mousePressedOver(over)&&gameState===END){
    obstacleGroup.destroyEach();
    gameState="PLAY";
    fruitG.destroyEach();
    over.visible=false;
    score = 0;
    time=0;
  }
 drawSprites();

  stroke("black");
  strokeWeight(5)
  textSize(15);
  fill("aqua");
  text("score:"+ score, 380,50);
  
  stroke("black");
  strokeWeight(5)
  textSize(20);
  fill("aqua");
  text("Survival Time: "+ time + "s", 50,50);
}
function spawnFruit(){
  if(frameCount % 100 === 0){
    r = Math.round(random(1,2));
    var fruits = createSprite(500,200,10,10);
    fruits.y = Math.round(random(50,200))
    fruits.velocityX = -10
    fruits.scale = 0.1;
    fruitG.add(fruits);
       fruits.addImage(fruit2);
 }
}

function obstacles(){
 if(frameCount % 70 === 0){
    obstacle = createSprite(500,200,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -10;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
   
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200);
 }
}