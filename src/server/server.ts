import express from "express"
import path from "path"
import http from "http"

const port: number = 3004


class App {

    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/managerclass', express.static(path.join(__dirname, '../../dist/client/managerclass.js')))
        app.use('/audio', express.static(path.join(__dirname, '../../dist/client/audio.js')))
        app.use('/score', express.static(path.join(__dirname, '../../dist/client/score.js')))
        app.use('/paddle', express.static(path.join(__dirname, '../../dist/client/paddle.js')))
        app.use('/ball', express.static(path.join(__dirname, '../../dist/client/ball.js')))
        app.use('/table', express.static(path.join(__dirname, '../../dist/client/table.js')))

        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/PointerLockControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/PointerLockControls.js')))

        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/loaders/GLTFLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
        app.use('/jsm/libs/dat.gui.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/dat.gui.module.js')))
        this.server = new http.Server(app);
        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log( `Server listening on port ${this.port}.` )
        })
    }

}

new App(port). Start()