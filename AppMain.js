var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-40;
var speed = 5;
var dx = speed;
var dy = -speed;

var mainPlayerIndex = 0;
class Player
{
    constructor()
    {
        this.playerHeight = canvas.width/10;
        this.playerWidth = playerHeight/3;
        this.playerX = (canvas.width-playerWidth)*2/3;
        this.playerY = canvas.height-playerHeight - 20;
        
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        this.diffence = false;
    }
}

var players = new Array();
players.push(new Player());

var playerHeight = canvas.width/10;
var playerWidth = playerHeight/3;
var playerX = (canvas.width-playerWidth)*2/3;
var playerY = canvas.height-playerHeight - 20;

var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;
var diffence = false;

var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 20;
var brickHeight = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#6e00dd";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(playerX, playerY, playerWidth, playerHeight);
  if (diffence){
      ctx.fillStyle = "#00dd3b";
  } else {
      ctx.fillStyle = "#0095DD";
  }
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

    // 壁との当たり判定
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
    dy = -dy;
  }
    
    // 当たり判定
  if (x > playerX && x < playerX + playerWidth) {
    if(y > playerY && y < playerY + playerHeight) {
        if(diffence){
           dx = -dx; 
        }
        else {
            lives--;
          if(!lives) {
            alert("GAME OVER");
            document.location.reload();
          }
        }
    }      
  }

  if(moveRight && playerX < canvas.width-playerWidth) {
    playerX += 7;
  }
  else if(moveLeft && playerX > 0) {
    playerX -= 7;
  }
    
  if(moveUp && playerY > 0) {
    playerY -= 7;
  }
  else if(moveDown && playerY < canvas.height-playerHeight) {
    playerY += 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();