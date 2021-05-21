import * as THREE from '/build/three.module.js'
//creating a class to define a ball

export class Ball {

    //declaring constants
    public BALL_RADIUS = 25;
    public ball;

    //function definition of adding a ball
    public addBall = () => {
        const ballGeometry = new THREE.SphereGeometry(this.BALL_RADIUS, 16, 16);
        const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xff57a6 });
        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        return this.ball;
    }
}
