import * as THREE from '/build/three.module.js'

export class Table {
    public table;
    public boundary;
    public table_WIDTH = 1000;
    public table_LENGTH = 2800;
    public tableleg1;
    public tableleg2;

    public addTable = () => {

        const tableGeometry = new THREE.BoxGeometry(this.table_WIDTH, 5, this.table_LENGTH),
            tableMaterial = new THREE.MeshLambertMaterial({ color: 0x7CFC00 });
        this.table = new THREE.Mesh(tableGeometry, tableMaterial);
        return this.table;
    }
    public addBoundry = () => {
        const texture_loader = new THREE.TextureLoader();//to load texture
        const boundary_texture = texture_loader.load('wood1.jpg');
        const boundaryMaterial = new THREE.MeshLambertMaterial({ map: boundary_texture });
        this.tableleg1 = new THREE.Mesh(new THREE.BoxGeometry(20, 550, 20, 1), boundaryMaterial);
        this.tableleg1.position.x = -500;
        this.tableleg1.position.y = -350;
        this.tableleg1.position.z = 1300;
        this.tableleg2 = new THREE.Mesh(new THREE.BoxGeometry(20, 550, 20, 1), boundaryMaterial);
        this.tableleg2.position.x = 500;
        this.tableleg2.position.y = -350;
        this.tableleg2.position.z = 1300;
        const boundaryGeometry = new THREE.BoxGeometry(this.table_WIDTH + 50, 5, this.table_LENGTH + 60);
        this.boundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
        return this.boundary;



    }

}
