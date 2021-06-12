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
let terrains = [];

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
  terrain_1 = loadImage('images/terrain_1.png')

}

function setup() {
  createCanvas(windowWidth, windowHeight);


  gapFromBottom = 50;
  refFrame = height - gapFromBottom;
  ground = refFrame - 15;
  //console.log(windowWidth);
  dino = new Dino();

  createDirt(windowWidth * dirtDensityInPerPixels);

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

//terrain
let terrainTimer = 0;
let randTerrainAddition = 70;
let minTimeBetweenTerrains = 20;

function draw() {
  console.log(terrains.length)
  updateObstacles();
  updateClouds();
  updateTerrain();


  background(255);

  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].move();
    clouds[i].show();

    deleteClouds(i);
  }


  // The ground --------------------------------
  push();
  stroke(0);
  strokeWeight(2);
  line(0, ground, width, ground);
  pop();

  if (!dino.dead) {

    for (let i = terrains.length - 1; i >= 0; i--) {
      terrains[i].move();
      terrains[i].show();

      deleteTerrain(i);
    }

    dino.show();
    dino.move();

    for (let dirt of dirts) {

      dirt.move();
      dirt.show();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {

      obstacles[i].move();
      obstacles[i].show();

      if (dino.hits(obstacles[i])) {
        console.log('game over');
        dino.dead = true;
        dino.gravity = 0;
        dino.vy = 0;
      }

      deleteObstacle(i);

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

function updateTerrain() {
  terrainTimer++;

  if (terrainTimer > minTimeBetweenTerrains + randTerrainAddition) {
    addTerrain();
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

function addTerrain() {
  randTerrainAddition = floor(random(70));
  terrains.push(new Terrain());
  terrainTimer = 0;
  console.log("Terrain Added");
}


function deleteObstacle(i) {
  if ((obstacles[i].x + obstacles[i].w) < 0)
    obstacles.splice(i, 1);
}

function deleteClouds(i) {
  if ((clouds[i].x + clouds[i].w) < 0) {
    clouds.splice(i, 1);
  }
}

function deleteTerrain(i) {
  if ((terrains[i].x + terrains[i].w) < 0) {
    terrains.splice(i, 1);
  }
}

function createDirt(n) {
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
  terrains= [];
  obstacleTimer = 0;
  randAddition = 0;
  dino.dead = false;

}

function gameOverAnimation() {

  dino.show();
  dino.move();

  for (let t of terrains) {
    t.show();
  }
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