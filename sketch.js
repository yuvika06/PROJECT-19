// variables
var PLAY = 1 , END = 0 ,gameState = PLAY;
var monkey , monkeyRunning , monkeyCollided;
var  invisibleGround
var score , gameOver , restart;
var jumpSound , dieSound , checkPointSound;
var banana1 , banana2 , banana3;
var jungle, jungleImage;
var stone;
var gameOverImage, restartImage;
var bananaGroup;

function preload(){
  jungleImage = loadImage("i1.png");
  monkeyRunning = loadAnimation("Monkey_01.png" , "Monkey_02.png" ,"Monkey_03.png" ,"Monkey_04.png" ,"Monkey_05.png" ,"Monkey_06.png" ,"Monkey_07.png" , "Monkey_09.png" , "Monkey_10.png"  );
  monkeyCollided = loadImage("Monkey_01.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gm.png");
  banana1 = loadImage("b1.png");
  banana2 = loadImage("b2.png");
  banana3 = loadImage("b3.png");
  // jungleImage = loadImage("jungle.jpg" );
}

function setup(){
  createCanvas(600,200);
  
  
 // monkey.addAnimation("collided" , monkeyCollided);
 jungle = createSprite( 200,180, 400 ,20);
 jungle.addImage("jungle" , jungleImage);
 jungle.x = jungle.width/2;
 jungle.velocityX = -(6 + 3*score/100);

 monkey = createSprite(50,180,20,50);
 monkey.addAnimation("running" , monkeyRunning);
 monkey.addImage("collided" , monkeyCollided);
 monkey.scale = 0.2;


 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImage);

 restart = createSprite(400 ,100);
 restart.addImage(restartImage);

 gameOver.scale = 0.5;
 restart.scale = 0.5;

 gameOver.visible = false;
 restart.visible = false;

 invisibleGround = createSprite(200 , 190,400,10);
 invisibleGround.visible = false;


 bananaGroup = new Group();
 score = 0;
}

function draw(){
  background("black");
  text("Score:" + score , 500,50);


  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    jungle.velocityX = -(6+3*score/100);

    if(keyIsDown("space") && monkey.y >= 150){
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    if(jungle.x < 0){
      jungle.x = jungle.width/2;
    }

    monkey.collide(invisibleGround);
    spawnBanana;

    if(bananaGroup.isTouching(monkey)){
      gameState = END;
    }
   }

  else if (gameState===END){
    gameOver.visible = true;
    restart.visible = true;

    jungle.velocityX= 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);

    monkey.changeAnimation("collided" , monkeyCollided);

    bananaGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      reset();
    }
  }
   
  
  drawSprites();
}


  function spawnBanana(){
    if(frameCount % 60 ===0){
      var banana = createSprite(600,155,10,40);
      banana.velocityX = -(6+3*score/100);

      var rand = Math.round(random(1,3));
      switch(rand){
        case 1: banana.addImage(banana1);
                break;
        case 2: banana.addImage(banana2);
                break;
        case 3: banana.addImage(banana3);
                break;
        default: break;        

      }

      banana.scale = 0.5;
      banana.lifetime = 300;
      bananaGroup.add(banana);

    }
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    bananaGroup.destroyEach();
    monkey.changeAnimation("running" , monkeyRunning);
    score = 0;
  }





