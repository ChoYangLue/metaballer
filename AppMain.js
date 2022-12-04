var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Ball
{
    constructor()
    {
        this.ballRadius = 10;
        
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speed = 5;
        this.dx = this.speed;
        this.dy = -this.speed;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#6e00dd";
      ctx.fill();
      ctx.closePath();
    }
    
    hitPaddle(paddleForce)
    {
        this.dx = -this.dx * paddleForce;
    }
    
    hitWall(isHorizon)
    {
        var sp = 1;
        if (isHorizon){
            if (Math.abs(this.dx) > this.speed) sp = 1/2;
            this.dx = -this.dx * sp;
            return;
        }
        
        //if (Math.abs(this.dy) > this.speed) sp = 1/2;
        this.dy = -this.dy * sp;
    }
}
var ball = new Ball();

class Player
{
    constructor(name)
    {
        this.name = name;
        this.playerHeight = canvas.width/10;
        this.playerWidth = this.playerHeight/3;
        this.playerX = (canvas.width-this.playerWidth)*2/3;
        this.playerY = canvas.height-this.playerHeight - 20;
        this.speed = 7;
        
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


function drawBall() {
      ball.draw();
}

function drawPaddle() {
    for (var i = 0; i < players.length; i++) {
        players[i].draw();
        players[i].drawLife();
    }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+players[mainPlayerIndex].score, 8, 20);
}


function collisionPlayer2Ball(player, ballObject)
{
        // 当たり判定
  if (ballObject.x > player.playerX && 
      ballObject.x < player.playerX + player.playerWidth) 
  {
    if(ballObject.y > player.playerY && 
       ballObject.y < player.playerY + player.playerHeight) 
    {
        if(player.diffence){
           if (player.hit == false){
               ballObject.hitPaddle(2);
           }
        }
        else {
            console.log("hit!");
            if (player.hit == false) player.life--;
        }
        player.hit = true;
    }      
  }else{
        player.hit = false; 
  }
 
}

function collisionBall2Wall(ballObject)
{
    // 壁との当たり判定
    if(ballObject.x + ballObject.dx > canvas.width-ballObject.ballRadius ||
       ballObject.x + ballObject.dx < ballObject.ballRadius) {
        ballObject.hitWall(true);
    }
    if(ballObject.y + ballObject.dy < ballObject.ballRadius ||
       ballObject.y + ballObject.dy > canvas.height-ballObject.ballRadius) {
        ballObject.hitWall(false);
    }
}


function movePlayer(mpi)
{
    if(players[mpi].moveRight && 
       players[mpi].playerX < canvas.width-players[mpi].playerWidth) {
        players[mpi].playerX += 7;
    }
    else if(players[mpi].moveLeft && 
            players[mpi].playerX > 0) {
        players[mpi].playerX -= 7;
    }
    
    if(players[mpi].moveUp && 
       players[mpi].playerY > 0) {
        players[mpi].playerY -= players[mpi].speed;
    }
    else if(players[mpi].moveDown && 
            players[mpi].playerY < canvas.height-players[mpi].playerHeight) {
        players[mpi].playerY += players[mpi].speed;
    }
}

function moveEnemy(pindex)
{
    var randomNumber = Math.floor( Math.random() * 51 );
    if (randomNumber == 1) {
        players[pindex].speed *= -1;
    }
    
    if (players[pindex].playerY<0) {
        players[pindex].speed = Math.abs(players[pindex].speed);
    } else if (players[pindex].playerY>canvas.height-players[pindex].playerHeight) {
        players[pindex].speed = -1*Math.abs(players[pindex].speed);
    }
    
    players[pindex].playerY += players[pindex].speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPaddle();
    drawScore();
    
    collisionBall2Wall(ball);
    
    // 当たり判定
    for (var i = 0; i < players.length; i++) {
        collisionPlayer2Ball(players[i], ball);
        
        if(players[i].life<0 && i == mainPlayerIndex) {
            alert("GAME OVER");
            ball.x = canvas.width/2;
            ball.y = canvas.height/2;
            players[i].life = 3;
            document.location.reload();
        } else if (players[i].life<0 && i != mainPlayerIndex) {
            alert("YOU WIN, CONGRATS!");
            ball.x = canvas.width/2;
            ball.y = canvas.height/2;
            players[i].life = 3;
            document.location.reload();
        }
    }
    
    for (var i = 0; i < players.length; i++) {
        if (i == mainPlayerIndex){
            movePlayer(mainPlayerIndex);
        }else{
            moveEnemy(i);
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    
    requestAnimationFrame(draw);
}

draw();