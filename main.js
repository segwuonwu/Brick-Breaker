// Variable declaration for HTML elements

let scoreBoard = document.getElementById('score'),
    levelBoard = document.getElementById('level'),
    liveBoard = document.getElementById('lives'),
    gameBoard = document.getElementById('game'),
    start = document.getElementById('start'),
    reset = document.getElementById('reset'),
    won = document.getElementById("win"),
    gameover = document.getElementById('gameover');

var score = 0,
    level = 1,
    lives = 3;

let ctx = gameBoard.getContext('2d');

// Set canvas width and height
gameBoard.setAttribute("width", getComputedStyle(gameBoard)["width"]);
gameBoard.setAttribute("height", getComputedStyle(gameBoard)["height"]);

// variables for the paddle
let paddleH = 12,
    paddleW = 70,
    paddleXLeft = (gameBoard.width - paddleW) / 2;
paddleXRight = paddleXLeft + paddleW;
// variables for ball positioning
let ballX = gameBoard.width / 2,
    ballY = gameBoard.height - 30,
    x = Math.floor((Math.random() * 10) + 1),
    y = Math.floor((Math.random() * 10) + 1),
    dx = 3,
    dy = 2;
let radius = 10;
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
            bricks[i][j] = {
                x: 0,
                y: 0,
                status: 1
            };
        }

    }
};

// function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleXLeft, gameBoard.height - 20, paddleW, paddleH);
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath();
};

// function to move the paddle
function paddleMovement() {
    if (arrowLeft && (paddleXLeft > 0)) {
        paddleXLeft -= 7;
    } else if (arrowRight && (paddleXLeft + paddleW) < gameBoard.width) {
        paddleXLeft += 7;
    }
}

// keyboard pressed down function
function keyPress(event) {
    if (event.keyCode === 39) {
        arrowRight = true;
    } else if (event.keyCode === 37) {
        arrowLeft = true;
    }
}

document.addEventListener('keydown', keyPress);

// keyboard press release function
function keyRelease() {
    if (event.keyCode === 39) {
        arrowRight = false;
    } else if (event.keyCode === 37) {
        arrowLeft = false;
    }
}

document.addEventListener('keyup', keyRelease);

// function to draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
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
            if (bricks[i][j].status == 1) {
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
}

function brickCollision() {
    for (let i = 0; i < brickColn; i++) {
        for (let j = 0; j < brickRow; j++) {
            let b = bricks[i][j];
            if (b.status === 1) {
                if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickColn * brickRow) {
                        won.style.display = "block";
                        reset.style.display = "inline"
                        dx = 0;
                        dy = 0;

                        reset.addEventListener('click', function() {
                            document.location.reload();
                        })
                    }
                }
            }

        }
    }
}

// checking for collision with wall
function wallCollision() {
    if (ballX + dx > gameBoard.width - radius || ballX + dx < radius) {
        dx = -dx;
    }
    if (ballY + dy < radius) {
        dy = -dy;
    } else if (ballY + dy > gameBoard.height) {
        dy = -dy;
    }
}


// checking for paddle collision
function paddleCollision() {
    if (ballY >= gameBoard.height - 15 && ballY <= gameBoard.height - 30) {
        console.log("ballY before:", ballY);
        if (ballX - radius == paddleXRight || ballX + radius == paddleXLeft) {
            console.log("ballY after", ballX);
            dy = -dy;
        }
    }

    if (ballY === gameBoard.height - 30) {
        if ((ballX <= paddleXLeft + 70) &&
            (ballX >= paddleXLeft)) {
            dy = -dy;
        }
        // need work
        // if (ballX - radius == paddleXRight || ballX + radius == paddleXLeft) {
        //     console.log(ballX);
        //     dy = -dy;
        // }
    } else if (ballY + dy > gameBoard.height) {
        //console.log(ballX + dy);
        lives--;
        console.log(lives);
        if (lives == 0) {
            gameover.style.display = "block";
            reset.style.display = "inline"
            dx = 0;
            dy = 0;

            reset.addEventListener('click', function() {
                document.location.reload();
            })

        } else {
            //console.log(ballX, " ", paddleXRight / 2)
            ballX = gameBoard.width / 2;
            ballY = gameBoard.height - 34;
            dx = 3;
            dy = 2;
            paddleXLeft = (gameBoard.width - paddleW) / 2;
        }
    }
}

// Function to start and loop game. Main game function
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);

    drawBricks();
    drawBall();
    drawPaddle();
    levelBoard.textContent = `Level: ${level}`;
    scoreBoard.textContent = `Score: ${score}`;
    liveBoard.textContent = `Lives: ${lives}`;
    brickCollision();
    paddleCollision();
    wallCollision();

    paddleMovement();
    ballMovement();
    requestAnimationFrame(gameLoop);
}