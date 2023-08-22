import * as THREE from "three";
import HomeScene from "../HomeScene";

export default class World {
    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ wireframe: true })
        );
        this.scene.add(testMesh);
    }
}
