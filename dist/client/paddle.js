import * as THREE from '/build/three.module.js';
//created a class called paddle to create the paddle
export class Paddle {
    constructor() {
        //declaring constants
        this.PADDLE_WIDTH = 200;
        this.PADDLE_HEIGHT = 30;
        //funtion definition of add paddle
        this.addPaddle = () => {
            const paddleGeometry = new THREE.BoxGeometry(this.PADDLE_WIDTH, this.PADDLE_HEIGHT, 10), paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
            this.paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
            return this.paddle;
        };
    }
}
