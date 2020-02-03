/*
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
*/

// Variable declaration for HTML elements
var score = document.getElementById('center');
var level = document.getElementById('top-left');
var lives = document.getElementById('top-right');
var gameBoard = document.getElementById('game');
var reset = document.getElementById('status');

let ctx = gameBoard.getContext('2d');

// Set canvas width and height
gameBoard.setAttribute("width", getComputedStyle(gameBoard)["width"]);
gameBoard.setAttribute("height", getComputedStyle(gameBoard)["height"]);

// variables for the paddle
let paddleH = 12;
let paddleW = 70;
let pLocation = (gameBoard.width - paddleW) / 2;
// variables for ball positioning
let ballX = gameBoard.width / 2;
let ballY = gameBoard.height - 30;
let dx = 3,
    dy = -3;
let ballRadius = 10;
// keyboard keys
let arrowRight = false;
let arrowLeft = false;

// Game instruction
function gameInstruction() {
    var mgs = "Welcome to the brick breaker game \n" +
        "\n The goal is to break all the bricks";

    return mgs;
}

// function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(pLocation, gameBoard.height - 20, paddleW, paddleH);
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath();
};

// function to move the paddle
function paddleMovement() {

}

// keyboard pressed down function
function keyPress(event) {
    if (event.keyCode === 39) {
        arrowRight = true;
        console.log("right key has been pressed")
    } else if (event.keyCode === 37) {
        arrowLeft = true;
        console.log("left key has been pressed")
    }
}

document.addEventListener('keydown', keyPress);

// keyboard press release function
function keyRelease() {
    if (event.keyCode === 39) {
        arrowRight = false;
        console.log("right key has been released")
    } else if (event.keyCode === 37) {
        arrowLeft = false;
        console.log("left key has been released")
    }
}

document.addEventListener('keyup', keyRelease);

// function to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
};

//change in ball direction
function ballMovement() {
    // ballX += dx;
    // ballY += dy;
}

// function to draw bricks
function drawBricks() {

}

// function to detect ball collision 
function collisionDetection() {

}

// Function to start and loop game. Main game function
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBall();
    drawPaddle();

    ballMovement();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
//setInterval(gameLoop, 60);