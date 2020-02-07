// Variable declaration for HTML elements

let scoreBoard = document.getElementById('score'),
    levelBoard = document.getElementById('level'),
    liveBoard = document.getElementById('lives'),
    gameBoard = document.getElementById('game'),
    msg = document.getElementById("msg"),
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
                if (bricks[i][j].x % 2 === 0 && bricks[i][j].y % 2 === 0) {
                    ctx.fillStyle = "white";
                    ctx.fill()
                } else {
                    ctx.fillStyle = "blue";
                    ctx.fill()
                }
                ctx.closePath();
            }
        }
    }
}

// checking for collision with bricks
function brickCollision() {
    for (let i = 0; i < brickColn; i++) {
        for (let j = 0; j < brickRow; j++) {
            let b = bricks[i][j];
            if (b.status === 1) {
                if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    document.getElementById("hit").play();
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if (score === brickColn * brickRow) {
                        start.disabled = true;
                        document.getElementById("intro").pause();
                        document.getElementById("yay").play();
                        won.style.display = "block";
                        reset.style.display = "inline"
                        dx = 0;
                        dy = 0;
                        reset.addEventListener('click', function() {
                            start.disabled = false;
                            document.location.reload();
                            document.getElementById("yay").pause();
                            msg.style.display = "block";
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
    if (ballY === gameBoard.height - 30) {
        if ((ballX <= paddleXLeft + 70) &&
            (ballX >= paddleXLeft)) {
            dy = -dy;
        }
    } // side paddle collision detection
    // if Y is in range of paddle bottom and paddle top + height of ball
    else if (ballY >= gameBoard.height - 18 && ballY <= gameBoard.height - 30) {
        // if ball is touching left end of paddle OR right end of paddle
        if ((ballX <= paddleXLeft && ballX >= paddleXLeft - 10) || (bellX >= paddleXRight && bellx <= paddleXRight + 10)) {
            dy = -dy;
        }
    } else if (ballY + dy > gameBoard.height) {
        lives--;
        console.log(lives);
        if (lives == 0) {
            start.disabled = true;
            gameover.style.display = "block";
            document.getElementById("intro").pause();
            document.getElementById("dead").play();
            reset.style.display = "inline"
            dx = 0;
            dy = 0;

            reset.addEventListener('click', function() {
                start.disabled = false;
                document.location.reload();
                document.getElementById("dead").pause();
                msg.style.display = "block";
            })
        } else {
            ballX = gameBoard.width / 2;
            ballY = gameBoard.height - 34;
            dx = 3;
            dy = 2;
            paddleXLeft = (gameBoard.width - paddleW) / 2;
        }
    }
}

//add background music
start.addEventListener("click", function() {
    document.getElementById("intro").play();
});

// Function to start and loop game. Main game function
function gameLoop() {
    msg.style.display = "none";
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