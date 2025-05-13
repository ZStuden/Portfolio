/*
12.13.2024

By Zen Sabio

Created for MMP 210
Prof Roberts

*/

let player = Player();
let enemy1;
let points = [];

let collisionRadius = 15;
let collisionRadius2 = 0;
let collisionRadius3 = 17;

let score = 0;
let scoreStar = 0;
let hp = 20;

let difficulty = 2;

let gameState = 0;

let playerIdleS, playerWalkS, playerWalkleftS, playerAttackS;
let enemyIdleS, enemyWalkS, enemyWalkleftS, enemyAttackS, enemyDeath;
let starPoint, starPointspriteCollected;

let titleScreen,
  gameOverScreen,
  playButtonImg,
  instrButtonImg,
  backgroundGame,
  controlsImg,
  winScreenImg;
let titleButton, tryAgainButton;
let titlelogo;

let backGroundmusic, attackSound, pickupStarSound;

function preload() {
  playerIdleS = loadImage("sprites/animation_idle_move.gif");
  playerWalkS = loadImage("sprites/animation_walk_test_2.gif");
  playerWalkleftS = loadImage("sprites/animation_walk_test_left.gif");
  playerAttackS = loadImage("sprites/attack_animation _Blue2.gif");

  enemyIdleS = loadImage("sprites/animation_idle_red.gif");
  enemyWalkS = loadImage("sprites/animation_walk_red.gif");
  enemyWalkleftS = loadImage("sprites/animation_walk_red_left.gif");
  enemyAttackS = loadImage("sprites/red_attack_animation.gif");
  enemyDying = loadImage("sprites/animation_red_death.gif");

  starPointsprite = loadImage("sprites/Piskel star (1).gif");
  starPointspriteCollected = loadImage("sprites/Piskel star collected.gif");

  backGroundmusic = loadSound("audio/gameAudio.mp3");
  attackSound = loadSound("audio/Hit_hurt 3.mp3");
  pickupStarSound = loadSound("audio/pickup_star.wav");

  titleScreen = loadImage("ui/title.png");
  gameOverScreen = loadImage("ui/Gmaer-over.png");
  winScreenImg = loadImage("ui/winscreen.png");
  titleButtonImg = loadImage("ui/titleagain.png");
  tryAgainButtonImg = loadImage("ui/retry.png");
  playButtonImg = loadImage("ui/playbtn.png");
  instrButtonImg = loadImage("ui/controlsbtn.png");

  backgroundGame = loadImage("sprites/background.gif");
  controlsImg = loadImage("sprites/mmp210-controlscrn.gif");
  logoImg = loadImage("sprites/tilelogo.gif");
}

function setup() {
  createCanvas(600, 400);

  imageMode(CENTER);

  enemy1 = Enemy();
  points.push(Star());

  backGroundmusic.loop(true);

  startButton = Button(75, 370, playButtonImg);
  controlsButton = Button(533, 370, instrButtonImg);
  titleButton = Button(75, 370, titleButtonImg);
  tryAgainButton = Button(533, 370, tryAgainButtonImg);
}

function draw() {
  background(220);

  if (gameState == 0) {
    startMenu();
  } else if (gameState == 1) {
    instructionMenu();
  } else if (gameState == 2) {
    game();
  } else if (gameState == 3) {
    gameOver();
  } else if (gameState == 4) {
    winScreen();
  }
}

function startMenu() {
  image(titleScreen, width / 2, height / 2);
  image(logoImg, width / 2, height - 100);

  startButton.display();

  controlsButton.display();

  if (startButton.clicked()) {
    gameState = 2;
  }

  if (controlsButton.clicked()) {
    gameState = 1;
  }
}

function instructionMenu() {
  image(controlsImg, width / 2, height / 1.8);

  startButton.display();

  controlsButton.display();

  if (startButton.clicked()) {
    gameState = 2;
  }

  if (controlsButton.clicked()) {
    gameState = 1;
  }
}

function gameOver() {
  image(gameOverScreen, width / 2, height / 2);
  image(logoImg, width / 2, height - 100);

  tryAgainButton.display();

  titleButton.display();

  if (tryAgainButton.clicked()) {
    gameState = 2;
  }

  if (titleButton.clicked()) {
    gameState = 0;
  }
}

function winScreen() {
  image(winScreenImg, width / 2, height / 2);
  image(logoImg, width / 2, height - 100);

  tryAgainButton.display();

  titleButton.display();

  if (tryAgainButton.clicked()) {
    gameState = 2;
  }

  if (titleButton.clicked()) {
    gameState = 0;
  }
}

function Button(x, y, img) {
  let h = 400;
  let w = 400;

  let isClicked = false;

  function display() {
    image(img, x, y);
  }

  function clicked() {
    if (mouseIsPressed) {
      if (
        mouseX > x - w / 2 &&
        mouseX < x + w / 2 &&
        mouseY > y - h / 2 &&
        mouseY < y + h / 2
      ) {
        if (!isClicked) {
          isClicked = true;
          return true;
        }
      }
    } else if (isClicked) {
      isClicked = false;
    }
    return false;
  }

  return { display, clicked };
}

function game() {
  image(backgroundGame, width / 2, height / 4);

  player.move();
  player.display();

  enemy1.move();
  enemy1.display();

  for (let i = 0; i < points.length; i++) {
    const star = points[i];
    star.move();
    star.display();

    let isColliding = detectCollision(player, star, collisionRadius3);
    if (isColliding && star.getStatus()) {
      star.collected();
      pickupStarSound.play();
      scoreStar = scoreStar + 1;
      hp = hp + 1;
    }
  }

  if (hp / 3 < difficulty) {
    difficulty = difficulty + 10;
    points.push(Star());
  }

  if (scoreStar >= 12) {
    gameState = 4;
    scoreStar = 0;
    hp = 20;
    score = 0;
    difficulty = 2;
    points = [];
    points.push(Star());
  }

  let enemy1Collide = detectCollision(player, enemy1, collisionRadius);

  if (enemy1Collide && !player.getHitStatus()) {
    enemy1.attack();
    player.hit();
    hp = hp - 1;

    if (!attackSound.isPlaying()) {
      attackSound.play();
    }
  }

  let playerCollide = detectCollision(enemy1, player, collisionRadius2);

  if (playerCollide && enemy1.eniStatus()) {
    enemy1.death();
    score = score + 1;
  }

  if (score >= 55) {
    gameState = 4;
    score = 0;
    scoreStar = 0;
    hp = 20;
    difficulty = 2;
  }
  //Gameover
  if (hp <= 0) {
    gameState = 3;
    score = 0;
    scoreStar = 0;
    hp = 20;
    difficulty = 2;
  }

  // Display stats

  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(25);
  textFont("Tiny5");
  text("Kills :", 420, 380);
  text("stars :", 240, 380);
  text(": Heath", 90, 380);
  textSize(45);
  fill(220, 20, 60);
  text(score, 510, 380);
  fill(199, 238, 192);
  text(hp, 30, 380);
  fill(215, 189, 226);
  text(scoreStar, 330, 380);
}

function Player() {
  let isHit = false;

  //pos
  let x = 195;
  let y = 239;

  //animation
  let animationState = 0;
  // 0 = idle
  // 1 = walk
  // 2 = walk left
  // 3= attack

  function move() {
    animationState = 0;

    if (keyIsDown(LEFT_ARROW)) {
      x = x - 5;
      animationState = 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      x = x + 5;
      animationState = 1;
    }

    if (keyIsDown(32)) {
      animationState = 3;
      collisionRadius2 = 50;
      setTimeout(reset, 10);

      if (!attackSound.isPlaying()) {
        attackSound.play();
      }
    } else {
      collisionRadius2 = 0;
    }
  }

  function display() {
    if (animationState == 0) {
      image(playerIdleS, x, y);
    } else if (animationState == 1) {
      image(playerWalkS, x, y);
    } else if (animationState == 2) {
      image(playerWalkleftS, x, y);
    } else if (animationState == 3) {
      image(playerAttackS, x, y);
    }
  }

  function getPosition() {
    return { x, y };
  }

  function reset() {
    collisionRadius2 = 0;
  }

  function hitReset() {
    isHit = false;
  }

  function hit() {
    isHit = true;
    setTimeout(hitReset, 500);
  }

  function getHitStatus() {
    return isHit;
  }

  return { move, display, getPosition, getHitStatus, hit };
}

function Enemy() {
  let x = random(0, 200);
  let y = 239;
  let isAlive = true;

  let animationState = 0;

  function move() {
    if (animationState < 3) {
      x = x + 4;
      animationState = 1;
    }

    if (x > width) {
      x = 0;
      isAlive = true;
    }
  }

  function display() {
    if (animationState == 0) {
      image(enemyWalkS, x, y);
    } else if (animationState == 1) {
      image(enemyWalkS, x, y);
    } else if (animationState == 2) {
      image(enemyWalkleftS, x, y);
    } else if (animationState == 3) {
      image(enemyAttackS, x, y);
    } else if (animationState == 4) {
      image(enemyDying, x, y);
    }
  }

  function getPosition() {
    return { x, y };
  }

  function reset() {
    animationState = 1;
    x = 0;
    isAlive = true;
  }

  function resumeMove() {
    animationState = 1;
  }

  function death() {
    animationState = 4;
    isAlive = false;
    setTimeout(reset, 1000);
  }

  function attack() {
    if (!isAlive) return;
    animationState = 3;
    setTimeout(resumeMove, 300);
  }

  function eniStatus() {
    return isAlive;
  }

  return { move, display, getPosition, attack, death, eniStatus };
}

function Star() {
  let x, y, speedY, speedX;
  let isAlive, animationState;
  reset();

  function move() {
    y = y + speedY;

    x = x + speedX;

    if (x < 0) {
      speedX = speedX * -1;
    }

    if (x > width) {
      speedX = speedX * -1;
    }

    if (y > height) {
      reset();
    }
  }

  function reset() {
    y = 0;
    x = random(0, width);
    speedY = random(2, 8);
    speedX = random(-2, 2);
    animationState = 0;
    notCollected = true;
  }

  function display() {
    if (animationState == 0) {
      image(starPointsprite, x, y);
    } else if (animationState == 1) {
      image(starPointspriteCollected, x, y);
    }
  }

  function getPosition() {
    return { x, y };
  }

  function collected() {
    animationState = 1;
    notCollected = false;
  }

  function getStatus() {
    return notCollected;
  }

  return { move, display, getPosition, collected, getStatus, reset };
}

function detectCollision(objPL, objE, radius) {
  let positionA = objPL.getPosition();
  let positionB = objE.getPosition();

  let d = dist(positionA.x, positionA.y, positionB.x, positionB.y);
  let isColliding = d < radius;
  return isColliding;
}
