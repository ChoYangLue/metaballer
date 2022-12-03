document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        moveRight = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = true;
    }
    
    if(e.key == "Up" || e.key == "ArrowUp") {
        moveUp = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        moveDown = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        moveRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = false;
    }
    
    if(e.key == "Up" || e.key == "ArrowUp") {
        moveUp = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        moveDown = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    players[mainPlayerIndex].playerX = relativeX - players[mainPlayerIndex].playerWidth/2;
  }
    
  var relativeY = e.clientY - canvas.offsetTop;
  if (relativeY > 0 && relativeY < canvas.height) {
    players[mainPlayerIndex].playerY = relativeY - players[mainPlayerIndex].playerHeight/2;
  }
}

function mouseDownHandler(e){
    players[mainPlayerIndex].diffence = true;
}
function mouseUpHandler(e){
    players[mainPlayerIndex].diffence = false;
}