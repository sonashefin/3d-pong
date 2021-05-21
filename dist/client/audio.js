import * as THREE from '/build/three.module.js';
export class Audio {
    constructor() {
        this.listener = new THREE.AudioListener();
        // create a global audio source
        this.sound = new THREE.Audio(this.listener);
        // load a sound and set it as the Audio object's buffer
        this.audioLoader = new THREE.AudioLoader();
        this.audiohit = () => {
            this.audioLoader.load('hit.ogg', (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setVolume(0.5);
                this.sound.play();
            });
        };
        this.audioscore = () => {
            this.audioLoader.load('score.ogg', (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setVolume(0.5);
                this.sound.play();
            });
        };
        this.audiowin = () => {
            this.audioLoader.load('win.ogg', (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setVolume(0.5);
                this.sound.play();
            });
        };
        this.audiolose = () => {
            this.audioLoader.load('lose.ogg', (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setVolume(0.5);
                this.sound.play();
            });
        };
    }
}
