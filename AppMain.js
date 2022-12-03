var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var speed = 5;
var dx = speed;
var dy = -speed;

class Player
{
    constructor(name)
    {
        this.name = name;
        this.playerHeight = canvas.width/10;
        this.playerWidth = this.playerHeight/3;
        this.playerX = (canvas.width-this.playerWidth)*2/3;
        this.playerY = canvas.height-this.playerHeight - 20;
        
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        
        this.diffence = false;
        this.hit = false;
        
        this.life = 3;
        this.score = 0;
    }
    
    draw()
    {
        ctx.beginPath();
        ctx.rect(
            this.playerX, 
            this.playerY, 
            this.playerWidth, 
            this.playerHeight);
        if (this.diffence){
            ctx.fillStyle = "#00dd3b";
        } else {
            ctx.fillStyle = "#0095DD";
        }
        ctx.fill();
        ctx.closePath();
    }
    
    drawLife() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Life: "+this.life, this.playerX, this.playerY - 20);
    }
}

var mainPlayerIndex = 0;
var players = new Array();
players.push(new Player("main"));
players.push(new Player("enemy"));

var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 20;
var brickHeight = 75;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

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
          players[mainPlayerIndex].score++;
          if(players[mainPlayerIndex].score == brickRowCount*brickColumnCount) {
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
    for (var i = 0; i < players.length; i++) {
        players[i].draw();
        players[i].drawLife();
    }
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
  ctx.fillText("Score: "+players[mainPlayerIndex].score, 8, 20);
}


function collisionPlayer2Ball(player, x, y)
{
        // 当たり判定
  if (x > player.playerX && 
      x < player.playerX + player.playerWidth) 
  {
    if(y > player.playerY && 
       y < player.playerY + player.playerHeight) 
    {
        if(player.diffence){
           dx = -dx; 
        }
        else {
            if (!this.hit) player.life--;
        }
        this.hit = true;
    }      
  }else{
        this.hit = false; 
  }
 
}

function collisionBall2Wall()
{
    // 壁との当たり判定
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    
    collisionDetection();
    collisionBall2Wall();
    
    // 当たり判定
    for (var i = 0; i < players.length; i++) {
        collisionPlayer2Ball(players[i], x, y);
        
        if(players[i].life<0 && i == mainPlayerIndex) {
            alert("GAME OVER");
            document.location.reload();
        } else if (players[i].life<0 && i != mainPlayerIndex) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
        }
    }
            
    

  if(players[mainPlayerIndex].moveRight && players[mainPlayerIndex].playerX < canvas.width-players[mainPlayerIndex].playerWidth) {
    players[mainPlayerIndex].playerX += 7;
  }
  else if(players[mainPlayerIndex].moveLeft && players[mainPlayerIndex].playerX > 0) {
    players[mainPlayerIndex].playerX -= 7;
  }
    
  if(players[mainPlayerIndex].moveUp && players[mainPlayerIndex].playerY > 0) {
    players[mainPlayerIndex].playerY -= 7;
  }
  else if(players[mainPlayerIndex].moveDown && players[mainPlayerIndex].playerY < canvas.height-players[mainPlayerIndex].playerHeight) {
    players[mainPlayerIndex].playerY += 7;
  }

  x += dx;
  y += dy;
    
  requestAnimationFrame(draw);
}

draw();