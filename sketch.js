// Organizar a colisão
// Organizar a pontuação

var ground,groundImage
var PLAY=1
var END=0
var nave,naveImg
var obstaclesGroup, obstacle1,obstacle2
var gameState=PLAY;
var gameover,gameoverImg, restart,restartImg
var score=0
 function preload(){
    groundImage=loadImage("b2.jpg")
    naveImg=loadAnimation("sprite_00.png","sprite_01.png","sprite_02.png",
    "sprite_03.png","sprite_04.png","sprite_05.png","sprite_06.png","sprite_07.png",
    "sprite_08.png","sprite_09.png","sprite_10.png")
    obstacle1 = loadImage("ast1-removebg-preview_50.png");
    obstacle2 = loadImage("asteroide-removebg-preview.png");
    gameoverImg = loadImage("gameove4.jpeg");
    restartImg = loadImage("restart.jpeg");



    //naveSpritedata = loadJSON("Imagens\protagonista\protagonista.json.json");
    //naveSpritesheet = loadImage("Imagens\protagonista\spritesheet.png");
}

function setup() {
    createCanvas(600, 300);  
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    
    ground.scale=1
    
     
    nave = createSprite(50,180,20,50);
    nave.addAnimation("teste",naveImg);
    nave.scale=1


    obstaclesGroup = createGroup();
    gameover = createSprite(300,100);
    gameover.addImage(gameoverImg);
    gameover.scale=0.1
    
    restart = createSprite(300,200);
    restart.addImage(restartImg);
    restart.scale=0.2

    nave.setCollider("rectangle",0,0,50,nave.height);
    nave.debug = true // mostra o raio colisor

}

function draw() {


    if(gameState === PLAY){
    
    // Sprites de fim de jogo estão invisíveis
        gameover.visible = false;
        restart.visible = false;

        //Movimento do chão
        ground.velocityX=-3
        // Aumento da pontuação
        if (frameCount%60==0){
            score = score + 1;
        }
        

        //plano de fundo infinito
        if (ground.x < 0){
            ground.x = ground.width/2;
        }
        nave.y=mouseY
        spawnObstacles() 
        if(obstaclesGroup.isTouching(nave)){
            //trex.velocityY = -12;
            //jumpSound.play();
            gameState = END;
            
        } 


   }   else if (gameState===END){
    // Sprites de fim de jogo estão invisíveis
        gameover.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
        obstaclesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);

        if(mousePressedOver(restart)) {
            reset();
        }
   }
    

    drawSprites()
    fill("white")
    textSize(20)
    text("Pontuaçao: "+ score, 400,50);
 
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var posy = Math.round(random(10,250));
      var obstacle = createSprite(400,posy,10,10);
      obstacle.velocityX = -6
    
       //gerar obstáculos aleatórios
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: 
            obstacle.addImage(obstacle1);
            obstacle.scale=0.5    
                   
   
            break;
         case 2: 
            obstacle.addImage(obstacle2);
            obstacle.scale=0.5    
            break;
       }

        //atribuir escala e vida útil ao obstáculo              
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;

        obstacle.setCollider("rectangle",0,0,80,80);
        obstacle.debug = true // mostra o raio colisor
       
       //adicione cada obstáculo ao grupo
        obstaclesGroup.add(obstacle);
     }
}
function reset(){
    gameState = PLAY;  
    obstaclesGroup.destroyEach();
    score = 0;
  }
  