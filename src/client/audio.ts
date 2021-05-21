import * as THREE from '/build/three.module.js'

export class Audio {

    public listener = new THREE.AudioListener();
    // create a global audio source
    public sound = new THREE.Audio(this.listener);
    // load a sound and set it as the Audio object's buffer
    public audioLoader = new THREE.AudioLoader();
    public audiohit = () => {

        this.audioLoader.load('hit.ogg', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        });
    }
    public audioscore = () => {

        this.audioLoader.load('score.ogg', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        });
    }
    public audiowin = () => {

        this.audioLoader.load('win.ogg', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        });
    }
    public audiolose = () => {

        this.audioLoader.load('lose.ogg', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setVolume(0.5);
            this.sound.play();
        });
    }
}
