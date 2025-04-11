

    const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let playerPosition = { x: 0, y: 0 };
let score = 0;
let obstacles = [];
let gameInterval;
let obstacleInterval;


// Array of obstacle images
const obstacleImages = [
    'images/https://www.google.com/imgres?q=%20copyright%20free%20images%20of%20obstacles%20like%20stone&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fstone-arch-with-greenery-illustration_1308-179836.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fstone-obstacles&docid=WXz7BsWsg3_lqM&tbnid=ZgTmV4n_9yD_jM&vet=12ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oECBwQAA..i&w=626&h=362&hcb=2&ved=2ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oECBwQAA',
    'images/https://www.google.com/imgres?q=%20copyright%20free%20images%20of%20obstacles%20like%20stone&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fancient-ruin-vector-set-old-atlantis-building_107791-26957.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fstone-obstacles&docid=WXz7BsWsg3_lqM&tbnid=TJWNtk528859mM&vet=12ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oECBgQAA..i&w=626&h=200&hcb=2&ved=2ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oECBgQAA',
    'images/https://www.google.com/imgres?q=%20copyright%20free%20images%20of%20obstacles%20like%20stone&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fseet-stone-walls-flat-vector-260nw-2506021769.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fobstacle-wall&docid=w98nBn52lJsPNM&tbnid=wd_rVOYttWJ4xM&vet=12ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oFCIgBEAA..i&w=390&h=280&hcb=2&ved=2ahUKEwiGo7rT3c-MAxV_cPUHHZZAGXEQM3oFCIgBEAA'
];

// Function to start the game
function startGame() {
    // Randomly select a player image
    player.style.backgroundImage = `url('${randomImage}')`;

    document.addEventListener('keydown', movePlayer);
    obstacleInterval = setInterval(createObstacle, 2000);
    gameInterval = setInterval(updateGame, 100);
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    // Randomly select an obstacle image
    const randomObstacleImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
    obstacle.style.backgroundImage = `url('${randomObstacleImage}')`;
    obstacle.style.backgroundSize = 'cover'; // Ensure the image covers the entire div

    obstacle.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    obstacle.style.top = '0px';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}


function startGame() {
    document.addEventListener('keydown', movePlayer);
    obstacleInterval = setInterval(createObstacle, 2000);
    gameInterval = setInterval(updateGame, 100);
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= 10;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 30) playerPosition.y += 10;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= 10;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 30) playerPosition.x += 10;
            break;
    }
    updatePlayerPosition();
}

function updatePlayerPosition() {
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    obstacle.style.top = '0px';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

function updateGame() {
    score += 10;
    scoreDisplay.innerText = 'Score: ' + score;

    obstacles.forEach((obstacle, index) => {
        let obstacleTop = parseInt(obstacle.style.top);
        obstacle.style.top = obstacleTop + 5 + 'px';

        if (obstacleTop > gameArea.clientHeight) {
            gameArea.removeChild(obstacle);
            obstacles.splice(index, 1);
        }

        if (isCollision(player, obstacle)) {
            endGame();
        }
    });

    if (score >= 90000) {
        alert('You have crossed 90,000 points! You go home!');
        endGame();
    }
}

function isCollision(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.left > obstacleRect.right ||
        playerRect.right < obstacleRect.left
    );
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    alert('Game Over! Your score: ' + score);
    document.removeEventListener('keydown', movePlayer);
}