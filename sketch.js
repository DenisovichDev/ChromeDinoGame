let dino;
let dinoRun_1;
let dinoRun_2;
let dinoJump;
let dinoDeadJump;
let dinoDeadRun;
let cactusSmall;
let cactusBig;
let cacti;
let replayButton;
let gameOverText;
let cloudImg;
let terrain_1;

let obstacles = [];
let clouds = [];
let dirts = [];

let dirtDensityInPerPixels = 0.051;

let ground;
let refFrame;
let speed = 15;



function preload() {
  dinoRun_1 = loadImage('images/dinoRun_1.png');
  dinoRun_2 = loadImage('images/dinoRun_2.png');
  dinoJump = loadImage('images/dinoJump.png');
  cactusSmall = loadImage('images/cactusSmall.png');
  cactusBig = loadImage('images/cactusBig.png');
  cacti = loadImage('images/cactusMult.png');
  dinoDeadJump = loadImage('images/dinoJumpDead.png');
  dinoDeadRun = loadImage('images/dinoRunDead.png');
  replayButton = loadImage('images/replayButton.png');
  gameOverText = loadImage('images/gameOver.png');
  cloudImg = loadImage('images/cloud.png');
  terrain_1 = loadImage('images/terrain_1.jpg')

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  gapFromBottom = 50;
  refFrame = height - gapFromBottom;
  ground = refFrame - 15;
  //console.log(windowWidth);
  dino = new Dino();

  createDirt(windowWidth*dirtDensityInPerPixels);

  //console.log(dirts.length)


}



function keyPressed() {
  if (key == ' ' && !dino.jumping) {
    dino.jump();
    console.log('jump')
  }
}

function mousePressed() {
  if (!dino.dead && !dino.jumping) {
    dino.jump();
  }
}

// Important variables for reapeating objects 

// cacti
let obstacleTimer = 0;
let randAddition = 0;
let minTimeBetweenObstacles = 30;

// cloud 
let cloudTimer = 0;
let randCloudAddition = 40;
let minTimeBetweenClouds = 50;

function draw() {
  //console.log(clouds.length)
  updateObstacles();
  updateClouds();


  background(255);

  for (let cloud of clouds) {
    cloud.move();
    cloud.show();

    deleteClouds(cloud);
  }


  // The ground --------------------------------
  push();
  stroke(0);
  strokeWeight(2);
  line(0, ground, width, ground);
  image(terrain_1, 400, ground - 12);
  pop();

  if (!dino.dead) {

    dino.show();
    dino.move();

    for (let dirt of dirts) {
      
      dirt.move();
      dirt.show();
    }

    for (let c of obstacles) {

      c.move();
      c.show();

      deleteObstacle(c);

      if (dino.hits(c)) {
        console.log('game over');
        dino.dead = true;
        dino.gravity = 0;
        dino.vy = 0;
      }
    }
  } else {
    gameOverAnimation();
    if (mouseIsPressed) {
      resetParameters();
    }
  }

  //console.log(dirts.length);

}

function updateObstacles() {
  obstacleTimer++;

  if (obstacleTimer > minTimeBetweenObstacles + randAddition) {
    addObstacles();
  }
}

function updateClouds() {
  cloudTimer++;

  if (cloudTimer > minTimeBetweenClouds + randCloudAddition) {
    addClouds();
  }
}

function addObstacles() {
  let typeInput = floor(random(3));
  randAddition = floor(random(50));
  obstacles.push(new Cacti(typeInput));
  obstacleTimer = 0;
}

function addClouds() {
  randCloudAddition = floor(random(200));
  clouds.push(new Cloud());
  cloudTimer = 0;
}


function deleteObstacle(obs) {
  if ((obs.x + obs.w) < 0)
    obstacles.shift();
}

function deleteClouds(deadCloud) {
  if ((deadCloud.x + deadCloud.w) < 0) {
    clouds.shift();
    //console.log("cloud deleted");
  }
}

function createDirt(n){
  for (let i = 0; i < n; i++) {
    dirts.push(new Dirt())
  }
}

function resetParameters() {
  dino.run = true;
  dino.jumping = false;
  dino.gravity = 2;
  dino.y = dino.base;
  obstacles = [];
  obstacleTimer = 0;
  randAddition = 0;
  dino.dead = false;

}

function gameOverAnimation() {

  dino.show();
  dino.move();

  for (let c of obstacles) {
    c.vx = 0;
    c.show();
    c.move();
  }
  for (let d of dirts) {
    d.show();
  }
  push();
  imageMode(CENTER);
  image(replayButton, width / 2, height / 2, 60, 60);
  image(gameOverText, width / 2, height / 3);
  pop();

}