const ball = document.getElementById('ball');
const game = document.getElementById('game');

let speed = 2; // Vitesse initiale (en px)
let direction; 
let gameInterval;
let score = 0; 
let ballPosition
const proximityThreshold = 50; // Distance pour détecter le bord

function startGame() {
    setDirection();
    gameInterval = setInterval(moveBall, 10); // Lance le mouvement de la balle à intervalles réguliers
}

function setDirection() {
    direction = Math.random(); // Définit la direction initiale aléatoirement entre 0 et 1
}

function moveBall() {
    ballPosition = parseInt(ball.style.left) || 0;
    if (direction < 0.5) {
        if (ballPosition > -600) {
            ballPosition -= speed;
        } else {
            endGame();
        }
    } else {
        if (ballPosition < 600) {
            ballPosition += speed;
        } else {
            endGame();
        }
    }
    ball.style.left = `${ballPosition}px`;
}

function endGame() {
    alert(`Game Over! Votre score: ${score}`);
    clearInterval(gameInterval);
}

function KeyPress(event) {
    if (event.key === 'ArrowLeft' && ballPosition < -450) {
            score++;
            ball.style.left = `0px`;
            setDirection();
            speed = speed + 0.5;
    } 
    if (event.key === 'ArrowRight' && ballPosition > 450) {
            score++;
            ball.style.left = `0px`;
            setDirection();
            speed = speed + 0.5;
    }
}

document.addEventListener('keydown', KeyPress);


startGame()