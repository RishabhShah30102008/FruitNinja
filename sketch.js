var END = 0;
var PLAY = 1;
var gameState = PLAY;

var hitting_sword, sword, swordImage;


var spawnfruits, fruitGroup, fruit1Image, fruit1, fruit2Image, fruit2, fruit3Image, fruit3, fruit4Image, fruit4;

var spawnmonsters, monsterGroup, monsterImage, alien1, alien2;

var knifeSwooshSound, sword_sound;

var gameover, gameoverImage, gameoverSound;

var score;

var edges;

function preload(){
  
 swordImage = loadAnimation("sword.png");
    
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  
  gameOverImage = loadAnimation("gameover.png");
  
  sword_sound = loadSound("knifeSwooshSound.mp3");
  
  gameoverSound = loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(600,600);
  
  edges = createEdgeSprites;
  
  fruitGroup = new Group();
  monsterGroup = new Group();
  
 hitting_sword = createSprite(100,200,20,20);
 hitting_sword.addAnimation("abc",swordImage);
 hitting_sword.addAnimation("gameOver",gameOverImage);
 hitting_sword.scale = 0.7;
  
 score = 0;
 
  hitting_sword.setCollider("circle",10,-5,30);
  hitting_sword.debug = false;
  
}

function draw(){

  background("cyan");
  
  if(gameState === PLAY){
    
  spawnfruits();
  spawnmonsters();
   
    if(fruitGroup.isTouching(hitting_sword)){
       sword_sound.play();
       fruitGroup.destroyEach();
       score = score+2;
       }
    
    if(monsterGroup.isTouching(hitting_sword)){
      monsterGroup.destroyEach();
      gameoverSound.play();
      gameState = END;
       }
    
    hitting_sword.x = mouseX;
    hitting_sword.y = mouseY;
    
    hitting_sword.changeAnimation("abc",swordImage);
    
     }

  if(gameState === END){
    
 hitting_sword.changeAnimation("gameOver",gameOverImage);
    
 fruitGroup.destroyEach();
 monsterGroup.destroyEach();
    
 fruitGroup.setVelocityEach(0);
 monsterGroup.setVelocityEach(0);   
    
 hitting_sword.x = 300;
 hitting_sword.y = 300;
    
}
  
  drawSprites();
  
  textSize(15);
  fill("black");
  text("Score: "+ score, 300,50);
  
}

function spawnfruits(){
  
  if (frameCount % 80 === 0){
   var fruit = createSprite(600,165,10,40);
   position = Math.round(random(1,2));
    
    fruit.scale = 0.2;
    
    //generate random obstacles
   var rand = Math.round(random(1,4));

    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
      default: break;
    }   
    
    fruit.y = Math.round(random(50,340));
   
    fruit.lifetime = 150;
    
    fruitGroup.add(fruit);
    
    if(position==1){
      
      fruit.x = 600;
      
    fruit.velocityX = -(7 + (score/4));
      
    } else
      {
        if(position==2){
          
          fruit.x = 0;
          
          fruit.velocityX = (7 + (score/4));

        }
      }
    
}
}

function spawnmonsters(){
  
  if (frameCount % 200 === 0){
   var monsters = createSprite(600,165,20,20);
   monsters.addAnimation("moving",monsterImage);
    
   position = Math.round(random(1,2));
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    
    monsters.y = Math.round(random(100,300));
   
    monsters.setLifetime = 150;
    
     if(position==1){
      
      monsters.x = 600;
      
    monsters.velocityX = -(8 + (score/10));
      
    } else
      {
        if(position==2){
          
          monsters.x = 0;
          
          monsters.velocityX = (8 + (score/10));

        }
      }
    
    monsterGroup.add(monsters);
    
}
}
