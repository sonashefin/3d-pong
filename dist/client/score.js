import { Audio } from './audio';
//creating a class to define the score board
export class Score {
    constructor() {
        //declaring members
        this.score = {
            player1: 0,
            player2: 0
        };
        //get the scoreboard element.
        this.scoreBoard = document.getElementById('scoreBoard');
        //get the status of play
        this.winner = document.getElementById('win');
        //get the restart button
        this.restartButton = document.getElementById("restart");
        //get the play button
        this.playButton = document.getElementById("play");
        //reset game definition 
        this.resetgame = () => {
            this.score.player1 = 0;
            this.score.player2 = 0;
            this.running = false;
        };
        //restart game defnition 
        this.restart = () => {
            this.resetgame();
            location.reload();
            this.restartButton.style.display = "none";
        };
        //score board function definition 
        this.updateScoreBoard = () => {
            this.scoreBoard.innerHTML = 'Player 1: ' + this.score.player1 + '&nbsp; &nbsp; Player 2: ' + this.score.player2;
            if (this.score.player1 == 5) {
                audioobj.audiowin();
                this.winner.innerHTML = 'YOU WON';
                this.resetgame();
                this.restartButton.style.display = "block";
            }
            else if (this.score.player2 == 5) {
                audioobj.audiolose();
                this.winner.innerHTML = 'YOU LOSE';
                this.resetgame();
                this.restartButton.style.display = "block";
            }
        };
    }
}
//creating the object of the score class and audio class
var scoreobj = new Score();
document.getElementById("restart").addEventListener('click', scoreobj.restart);
var audioobj = new Audio();
