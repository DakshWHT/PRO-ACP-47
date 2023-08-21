var background_img, player_img, playershooting_img, enemy1_img;
var player, attacker, bullet = 100;
var enemy_group, bullets_group;

function preload(){
  background_img = loadImage("assets/back2.png");
  player_img = loadImage("assets/3.png");
  playershooting_img  = loadImage("assets/3-gun.png");
  enemy1_img = loadImage("assets/1-e.png");
}

function setup(){
  createCanvas(1100, 600);
  player = createSprite(100, 500, 5, 5);
  player.addImage(player_img);
  player.scale = 0.4;
  enemy_group = new Group();
  bullets_group = new Group();
}

function draw(){
  background(background_img);


  if(keyDown("UP_ARROW")){
    player.y -= 5
    player.scale -= 0.002
  }
  if(keyDown("DOWN_ARROW")){
    player.y += 5
    player.scale += 0.002
  }
  if(keyDown("RIGHT_ARROW")){
    player.x += 5
  }
  if(keyDown("LEFT_ARROW")){
    player.x -= 5
  }
  if(keyWentDown("SPACE")){
    player.addImage(playershooting_img);
    bullet = createSprite(player.position.x + 70, player.position.y + 25, 15, 8);
    bullet.velocityX = 15;
    bullet.shapeColor = "#E52B1A"
    bullets_group.add(bullet);
    bullet -= 1;
  }
  if(keyWentUp("SPACE")){
    player.addImage(player_img);
  }

  if(enemy_group.isTouching(player)){
    for(var i = 0; i < enemy_group.length; i++){
      if(enemy_group[i].collide(player)){
        enemy_group[i].destroy();
      }
    }
  }

  enemy();
  shoot();  

  drawSprites();
}

function enemy(){

  if(frameCount % 100 == 0){
  attacker = createSprite(random(600, 1050), random(330, 540), 20, 20);
  attacker.addImage(enemy1_img);
  attacker.scale = 1.32;
  attacker.velocityX = -4;
  enemy_group.add(attacker); 
}
}

 function shoot() {
  if (this.shootPressed) {
    const speed = 5;
    const delay = 7;
    const damage = 1;
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y;
    this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
  }
}