import * as THREE from '/build/three.module.js';
import { Audio } from './audio';


//creating a class to define the score board
export class Score {

    //declaring members
    public score = {
        player1: 0,
        player2: 0
    }
    public running;

    //get the scoreboard element.
    public scoreBoard = document.getElementById('scoreBoard');
    //get the status of play
    public winner = document.getElementById('win');
    //get the restart button
    public restartButton = document.getElementById("restart");
    //get the play button
    public playButton = document.getElementById("play");

    //reset game definition 
    public resetgame = () => {
        this.score.player1 = 0;
        this.score.player2 = 0;
        this.running = false;
    }

    //restart game defnition 
    public restart = () => {
        this.resetgame();
        location.reload()
        this.restartButton.style.display = "none";
    }

    //score board function definition 
    public updateScoreBoard = () => {
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
    }

}

//creating the object of the score class and audio class
var scoreobj = new Score();
document.getElementById("restart").addEventListener('click', scoreobj.restart);
var audioobj = new Audio();
