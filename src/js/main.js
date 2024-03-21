
import { Game } from './modules/game.js'; 


const game = new Game();

game.start();

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    location.reload();
});