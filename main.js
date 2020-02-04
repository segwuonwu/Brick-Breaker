// Variable declaration for HTML elements
let score = document.getElementById('center'),
    level = document.getElementById('top-left'),
    lives = document.getElementById('top-right'),
    gameBoard = document.getElementById('game'),
    reset = document.getElementById('status');

let ctx = gameBoard.getContext('2d');

// Set canvas width and height
gameBoard.setAttribute("width", getComputedStyle(gameBoard)["width"]);
gameBoard.setAttribute("height", getComputedStyle(gameBoard)["height"]);

// variables for the paddle
let paddleH = 12,
    paddleW = 70,
    pLocation = (gameBoard.width - paddleW) / 2;
// variables for ball positioning
let ballX = gameBoard.width / 2,
    ballY = gameBoard.height - 30,
    dx = 3,
    dy = -3;
let ballRadius = 10;
// keyboard keys
let arrowRight = false,
    arrowLeft = false;
// brick variables
let bricks = [],
    brickHeight = 15,
    brickWidth = 65,
    brickRow = 4,
    brickColn = 6;

// Want to loop through and create an array of new brick
for (let i = 0; i < brickColn; i++) {
    if (!bricks[i]) {
        bricks[i] = [];
        for (let j = 0; j < brickRow; j++) {
            console.log("I'm here")
                // console.log(bricks[i][j]);
            bricks[i][j] = {
                x: 0,
                y: 0
            };
        }

    }
};
console.log(bricks)

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
    if (arrowLeft && (pLocation > 0)) {
        pLocation -= 5;
    } else if (arrowRight && (pLocation + paddleW) < gameBoard.width) {
        pLocation += 5;
    }
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
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
};

//change in ball direction
function ballMovement() {
    ballX += dx;
    ballY += dy;
}

// function to draw bricks
function drawBricks() {
    for (let i = 0; i < brickColn; i++) {
        for (let j = 0; j < brickRow; j++) {
            let brickPositionX = (i * (brickWidth + 10) + 30);
            let brickPositionY = (j * (brickHeight + 12) + 40);
            bricks[i][j].x = brickPositionX;
            bricks[i][j].y = brickPositionY;
            ctx.beginPath()
            ctx.rect(brickPositionX, brickPositionY, brickWidth, brickHeight);
            ctx.fillStyle = "white";
            ctx.fill()
            ctx.closePath();
        }
    }
}

// function to detect ball collision 
function collisionDetection() {
    if ((ballX + dx > gameBoard.width - ballRadius) || (ballX < ballRadius)) {
        dx--;
    }
    if (ballY + dy < ballRadius) {
        dy++;
    } else if (ballY + dy > gameBoard.height - ballRadius) {
        if (ballX > pLocation && ballX < pLocation - paddleW) {
            dy--;
        } else {
            console.log("GameOver");
        }
    }

}

// Function to start and loop game. Main game function
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBricks();
    drawBall();
    drawPaddle();

    collisionDetection()
    paddleMovement();
    ballMovement();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
//setInterval(gameLoop, 60);