import * as THREE from '/build/three.module.js';
import { Score } from './score';
import { Table } from './table';
import { Paddle } from './paddle';
import { Ball } from './ball';
import { Audio } from './audio';
//CREATING A MANAGER CLASS TO CONTROL AND IMPLEMENT EACH CASSES
class Pong {
    constructor() {
        // "constants"... 
        this.WIDTH = 1750;
        this.HEIGHT = 500;
        this.VIEW_ANGLE = 45;
        this.NEAR = 0.1;
        this.FAR = 10000;
        this.level1 = document.getElementById("level1");
        this.level2 = document.getElementById("level2 ");
        this.level3 = document.getElementById("level3 ");
        this.test = document.querySelectorAll('.wrapper');
        this.level = document.getElementById("level");
        this.main = () => {
            //display the play button while starting the game
            scoreobj.playButton.style.display = "block";
            //hide the restart button
            scoreobj.restartButton.style.display = "none";
            this.level.style.display = 'none';
            //get the screen and set up the renderer
            const container = document.getElementById('container');
            this.renderer = new THREE.WebGLRenderer({ container, alpha: true, });
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            container.appendChild(this.renderer.domElement);
            //set up the camera
            this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH / this.HEIGHT, this.NEAR, this.FAR);
            this.camera.position.set(0, 100, tableobj.table_LENGTH / 2 + 500);
            //set up the scene
            this.scene = new THREE.Scene();
            this.scene.add(this.camera);
            //calling the plane in to the manager class
            const table = tableobj.addTable();
            table.position.set(0, -50, 0);
            this.scene.add(table);
            //adding the table to the scene
            const boundary = tableobj.addBoundry();
            boundary.position.set(0, -55, 0);
            this.scene.add(boundary);
            this.scene.add(tableobj.tableleg1);
            this.scene.add(tableobj.tableleg2);
            //adding the paddle and added to scene
            const paddle1 = paddleobj.addPaddle();
            this.scene.add(paddle1);
            paddle1.position.z = tableobj.table_LENGTH / 2;
            const paddle2 = paddleobj.addPaddle();
            this.scene.add(paddle2);
            paddle2.position.z = -tableobj.table_LENGTH / 2;
            //adding the audio
            this.camera.add(audioobj.listener);
            //adding ball into the scene
            const ball = ballobj.addBall();
            this.scene.add(ball);
            this.camera.lookAt(ball.position);
            //adding light
            this.mainLight = new THREE.HemisphereLight(0xFFFFFF, 0x003300);
            this.scene.add(this.mainLight);
            //calling the  update score function
            scoreobj.updateScoreBoard();
            //to ae the window responsive
            window.addEventListener('resize', onWindowResize, false);
            var onWindowResize = () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            };
            //aading the paddle psition according to the camera posotion and move according to mouse move
            var containerMouseMove = (e) => {
                var mouseX = e.clientX;
                paddle1.position.x = -((this.WIDTH - mouseX) / this.WIDTH * tableobj.table_WIDTH) + (tableobj.table_WIDTH / 2);
            };
            //defintion of set of funtion to move the ball and paddle
            //to start the ball movement function definition
            var startBallMovement = () => {
                var direction = Math.random() > 0.5 ? -1 : 1;
                ball.velocity =
                    {
                        x: 0,
                        z: direction * 20
                    };
                ball.stopped = false;
            };
            //ball postion updation function defenition
            var updateBallPosition = () => {
                var ballPos = ball.position;
                ballPos.x += ball.velocity.x;
                ballPos.z += ball.velocity.z;
            };
            //side of the plane is collided then the defintion
            var isSideCollision = () => {
                var ballX = ball.position.x, halfFieldWidth = tableobj.table_WIDTH / 2;
                return ballX - ballobj.BALL_RADIUS < -halfFieldWidth || ballX + ballobj.BALL_RADIUS > halfFieldWidth;
            };
            //if paddle 1  is colloded thenthe definition
            var isPaddle1Collision = () => {
                return ball.position.z + ballobj.BALL_RADIUS >= paddle1.position.z &&
                    isBallAlignedWithPaddle(paddle1);
            };
            //if the ball is aligned with paddle then the defintion
            var isBallAlignedWithPaddle = (paddle) => {
                var halfPaddleWidth = paddleobj.PADDLE_WIDTH / 2, paddleX = paddle.position.x, ballX = ball.position.x;
                return ballX > paddleX - halfPaddleWidth &&
                    ballX < paddleX + halfPaddleWidth;
            };
            //if paddle 2  is colloded thenthe definition
            var isPaddle2Collision = () => {
                return ball.position.z - ballobj.BALL_RADIUS <= paddle2.position.z &&
                    isBallAlignedWithPaddle(paddle2);
            };
            //if the  paddle 1 or paddle 2 is collided then the hitback definition
            var hitBallBack = (paddle) => {
                ball.velocity.x = (ball.position.x - paddle.position.x) / 5;
                ball.velocity.z *= -1;
            };
            //if the ball is passed the paddle 1 so the definition of passing is
            var isPassedPaddle1 = () => {
                return ball.position.z > paddle1.position.z + 100;
            };
            //if the ball is passed the paddle 2 so the definition of passing is
            var isPassedPaddle2 = () => {
                return ball.position.z < paddle2.position.z - 100;
            };
            //then the score  scored by both the player1 and player 2 are is calculated trhough thr defenition
            var scoreBy = (playerName) => {
                addPoint(playerName);
                scoreobj.updateScoreBoard();
                stopBall();
                setTimeout(reset, 1500);
            };
            //stop ball if it is passed which is defined here
            var stopBall = () => {
                ball.stopped = true;
            };
            //aading the points to the scoreboard and set time out for 1sec
            var addPoint = (playerName) => {
                scoreobj.score[playerName]++;
                console.log(scoreobj.score);
            };
            //reset the ball to the intial postion
            var reset = () => {
                ball.position.set(0, 0, 0);
                ball.velocity = null;
            };
            //this is the definition of the  programer paddle which moves according to the ball position
            var processProgrammerPaddle = () => {
                var ballPos = ball.position, cpuPos = paddle2.position;
                if (cpuPos.x - 100 > ballPos.x) {
                    cpuPos.x -= Math.min(cpuPos.x - ballPos.x, this.difficulty);
                }
                else if (cpuPos.x - 100 < ballPos.x) {
                    cpuPos.x += Math.min(ballPos.x - cpuPos.x, this.difficulty);
                }
            };
            //processing of the ball movement definition 
            var processBallMovement = () => {
                if (!ball.velocity) {
                    //calling to start the ball movment
                    startBallMovement();
                }
                if (ball.stopped) {
                    return;
                }
                //calling the update  ball position 
                updateBallPosition();
                //if the side collision happens call the function
                if (isSideCollision()) {
                    ball.velocity.x *= -1;
                }
                //if the paddle1 is collided
                if (isPaddle1Collision()) {
                    audioobj.audiohit();
                    //hit back the ball
                    hitBallBack(paddle1);
                }
                //if the paddle2 is collided
                if (isPaddle2Collision()) {
                    audioobj.audiohit();
                    //hit back the ball
                    hitBallBack(paddle2);
                }
                //if the ball is passed the paddle 1
                if (isPassedPaddle1()) {
                    audioobj.audioscore();
                    //player 2 get the score
                    scoreBy('player2');
                }
                //if the ball is passed the paddle 1
                if (isPassedPaddle2()) {
                    audioobj.audioscore();
                    //player 2 get the score
                    scoreBy('player1');
                }
            };
            //function definition of the start render
            var startrender = () => {
                //set the boolean as true
                scoreobj.running = true;
                //hide the play button
                scoreobj.playButton.style.display = "none";
                //function definition of render
                var render = () => {
                    if (scoreobj.running) {
                        //call the ball movement function 
                        processBallMovement();
                        //call the programer paddle to move 
                        processProgrammerPaddle();
                        this.renderer.render(this.scene, this.camera);
                        requestAnimationFrame(render);
                    }
                };
                render();
            };
            //definition of the levels
            var easy = () => {
                this.difficulty = 2;
                this.level.style.display = 'none';
                startrender();
            };
            var medium = () => {
                this.difficulty = 6;
                this.level.style.display = 'none';
                startrender();
            };
            var hard = () => {
                this.difficulty = 10;
                this.level.style.display = 'none';
                startrender();
            };
            //if the play button is clicked then the definition is 
            var play = () => {
                scoreobj.running = false;
                this.level.style.display = 'block';
                //call the renderer to start
                //   startrender();
            };
            // clicking the play button
            document.getElementById("play").addEventListener('click', play);
            document.getElementById("level1").addEventListener('click', easy);
            document.getElementById("level2").addEventListener('click', medium);
            document.getElementById("level3").addEventListener('click', hard);
            //render accoding to the mouse move
            this.renderer.domElement.addEventListener('mousemove', containerMouseMove);
        };
    }
}
var scoreobj = new Score();
var tableobj = new Table();
var paddleobj = new Paddle();
var ballobj = new Ball();
var audioobj = new Audio();
var managerobj = new Pong();
managerobj.main();
