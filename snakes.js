// Game variables
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let box = 20;
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let obstacles = [];
let gameTime = 0; // Add this line

// Load images
let snakeImage = new Image();
snakeImage.src = "mysnake.png";
let foodImage = new Image();
foodImage.src = "apple.png";

let obstacleImage = new Image();
obstacleImage.src = "poison.png";

 
// Draw function
function drawGame() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);

    // Draw the snake
    for(let i = 0; i < snake.length; i++){
        context.drawImage(snakeImage, snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    context.drawImage(foodImage, food.x, food.y, box, box);

    // Draw the obstacles
for(let i = 0; i < obstacles.length; i++){
    context.drawImage(obstacleImage, obstacles[i].x, obstacles[i].y, box, box);
}

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Basic "AI" to move snake towards food
    if(snakeX < food.x) snakeX += box;
    else if(snakeX > food.x) snakeX -= box;
    else if(snakeY < food.y) snakeY += box;
    else if(snakeY > food.y) snakeY -= box;

    if(snakeX < box || snakeY < box || snakeX > 15*box || snakeY > 15*box) {
        clearInterval(game);
        return;
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snakeX && snake[i].y == snakeY){
            clearInterval(game);
            return;
        }
    }

    for(let i = 0; i < obstacles.length; i++){
        if(obstacles[i].x == snakeX && obstacles[i].y == snakeY){
            clearInterval(game);
            return;
        }
    }

    if(snakeX == food.x && snakeY == food.y){
        score += 10;
        if(score % 50 == 0){
            obstacles.push({
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            });
        }
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    // Increment game time
    gameTime += 0.1; // Add this line

    // Draw game time
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Time: " + gameTime.toFixed(1) + "s", 1*box, 1.6*box); // Keep this on the left

    // Draw score
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 11*box, 1.6*box);
}

// Start game
let game = setInterval(drawGame, 100);