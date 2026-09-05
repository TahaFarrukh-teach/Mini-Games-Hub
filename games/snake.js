const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const gridSize = 25;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let direction;
let nextDirection;
let score;
let gameRunning = false;
let gameOver = false;
let gameLoop;

let highScore =
    Number(localStorage.getItem("snakeHighScore")) || 0;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const statusDisplay = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");

function startGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    score = 0;
    gameRunning = true;
    gameOver = false;

    scoreDisplay.textContent = score;
    highScoreDisplay.textContent = highScore;
    statusDisplay.textContent = "Use Arrow Keys or WASD";

    createFood();

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 110);

    draw();
}

function createFood() {
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (
        snake.some(
            part =>
                part.x === food.x &&
                part.y === food.y
        )
    );
}

function updateGame() {
    if (!gameRunning) return;

    direction = nextDirection;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        endGame();
        return;
    }

    if (
        snake.some(
            part =>
                part.x === head.x &&
                part.y === head.y
        )
    ) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (
        head.x === food.x &&
        head.y === food.y
    ) {
        score++;

        scoreDisplay.textContent = score;

        if (score > highScore) {
            highScore = score;

            localStorage.setItem(
                "snakeHighScore",
                highScore
            );

            highScoreDisplay.textContent = highScore;
        }

        createFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Grid
    ctx.strokeStyle = "#222";

    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#ff4757";

    ctx.beginPath();

    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 3,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Snake
    snake.forEach((part, index) => {

        ctx.fillStyle =
            index === 0
                ? "#2ed573"
                : "#7bed9f";

        ctx.fillRect(
            part.x * gridSize + 2,
            part.y * gridSize + 2,
            gridSize - 4,
            gridSize - 4
        );
    });

    // Eyes
    const head = snake[0];

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(
        head.x * gridSize + 8,
        head.y * gridSize + 8,
        3,
        0,
        Math.PI * 2
    );

    ctx.arc(
        head.x * gridSize + 17,
        head.y * gridSize + 8,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function changeDirection(newDirection) {
    if (!gameRunning) {
        startGame();
    }

    if (
        newDirection.x === -direction.x &&
        newDirection.y === -direction.y
    ) {
        return;
    }

    nextDirection = newDirection;
}

document.addEventListener("keydown", event => {

    const key = event.key.toLowerCase();

    if (
        key === "arrowup" ||
        key === "w"
    ) {
        event.preventDefault();

        changeDirection({ x: 0, y: -1 });
    }

    if (
        key === "arrowdown" ||
        key === "s"
    ) {
        event.preventDefault();

        changeDirection({ x: 0, y: 1 });
    }

    if (
        key === "arrowleft" ||
        key === "a"
    ) {
        event.preventDefault();

        changeDirection({ x: -1, y: 0 });
    }

    if (
        key === "arrowright" ||
        key === "d"
    ) {
        event.preventDefault();

        changeDirection({ x: 1, y: 0 });
    }
});

document
    .querySelectorAll(".control-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const directionName =
                button.dataset.direction;

            if (directionName === "up") {
                changeDirection({ x: 0, y: -1 });
            }

            if (directionName === "down") {
                changeDirection({ x: 0, y: 1 });
            }

            if (directionName === "left") {
                changeDirection({ x: -1, y: 0 });
            }

            if (directionName === "right") {
                changeDirection({ x: 1, y: 0 });
            }
        });
    });

function endGame() {
    gameRunning = false;
    gameOver = true;

    clearInterval(gameLoop);

    statusDisplay.textContent =
        `Game Over! Score: ${score}`;
}

restartButton.addEventListener(
    "click",
    startGame
);

highScoreDisplay.textContent = highScore;

startGame();