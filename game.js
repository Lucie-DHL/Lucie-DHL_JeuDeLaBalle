const ball = document.getElementById('ball');
const game = document.getElementById('game');

let speed = 2; // Vitesse initiale (en px)
let direction; // Direction initiale
let gameInterval;
let score = 0; // Score initial
const proximityThreshold = 50; // Distance seuil pour détecter le bord

// Fonction pour démarrer le jeu
function startGame() {
    setDirection();
    gameInterval = setInterval(moveBall, 10); // Lance le mouvement de la balle à intervalles réguliers
}

function setDirection() {
    direction = Math.random(); // Définit la direction initiale aléatoirement entre 0 et 1
}

// Fonction pour déplacer la balle
function moveBall() {
    const ballPosition = ball.getBoundingClientRect(); // Récupère la position actuelle de la balle
    const gameAreaPosition = game.getBoundingClientRect(); // Récupère la position du conteneur de jeu

    // Vérifie la direction et déplace la balle
    if (direction < 0.5) { // Si la direction est vers la gauche
        if (ballPosition.left > gameAreaPosition.left) {
            ball.style.left = `${ball.offsetLeft - speed}px`; // Déplace la balle vers la gauche
        } else {
            endGame(); // Affiche "Game Over" si la balle touche le bord
        }
    } else { // Si la direction est vers la droite
        if (ballPosition.right < gameAreaPosition.right) {
            ball.style.left = `${ball.offsetLeft + speed}px`; // Déplace la balle vers la droite
        } else {
            endGame(); // Affiche "Game Over" si la balle touche le bord
        }
    }
}

// Fonction de fin de jeu
function endGame() {
    alert(`Game Over! Votre score: ${score}`); // Affiche un message de fin de jeu
    clearInterval(gameInterval); // Arrête le mouvement de la balle
}

// Fonction pour gérer les pressions de touches
function handleKeyPress(event) {
    const ballPosition = ball.getBoundingClientRect(); // Récupère la position actuelle de la balle
    const gameAreaPosition = game.getBoundingClientRect(); // Récupère la position du conteneur de jeu

    // Vérifie si la balle est proche d'un bord
    const isCloseToLeftEdge = ballPosition.left <= gameAreaPosition.left + proximityThreshold;
    const isCloseToRightEdge = ballPosition.right >= gameAreaPosition.right - proximityThreshold;

    if (event.key === 'ArrowLeft' && isCloseToLeftEdge) {
        // Vérifie si le joueur a pressé la bonne touche
        if (direction < 0.5) {
            score++; // Incrémente le score
            direction = 1; // Change la direction pour le prochain mouvement
            speed = speed + 0.2;
        }
    } else if (event.key === 'ArrowRight' && isCloseToRightEdge) {
        // Vérifie si le joueur a pressé la bonne touche
        if (direction >= 0.5) {
            score++; // Incrémente le score
            direction = 0; // Change la direction pour le prochain mouvement
            speed = speed + 0.5;
        }
    }
}

// Ajoute un écouteur d'événements pour les pressions de touches
document.addEventListener('keydown', handleKeyPress);

// Démarre le jeu
startGame();
