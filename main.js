/*
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
*/

// Variable declaration
var score = document.getElementById('top-left');
var lives = document.getElementById('top-right');
var gameBoard = document.getElementById('game');
var btn = document.getElementById('status');

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
let dx = 2,
    dy = -2;
let ballRadius = 10;



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

// function to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
};

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBall();
    drawPaddle();

    //change in ball direction
    //ballX += dx;
    //ballY += dy;
    requestAnimationFrame(gameLoop);
}

function collisionDetection() {

}

requestAnimationFrame(gameLoop);
//setInterval(gameLoop, 60);