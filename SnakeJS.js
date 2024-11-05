const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};

// Cambiar controles a W, A, S, D y evitar el desplazamiento de la página
document.addEventListener("keydown", (event) => {
    if (["W", "A", "S", "D"].includes(event.key.toUpperCase())) {
        event.preventDefault(); // Evita el desplazamiento de la página
    }
    directionControl(event);
});

function directionControl(event) {
    if (event.key.toUpperCase() === "A" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key.toUpperCase() === "W" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key.toUpperCase() === "D" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key.toUpperCase() === "S" && direction !== "UP") {
        direction = "DOWN";
    }
}

function draw() {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("¡Juego terminado!");
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game;
document.getElementById("startBtn").addEventListener("click", () => {
    clearInterval(game);
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = "";
    game = setInterval(draw, 100);
});
