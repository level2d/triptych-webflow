import * as THREE from "three";
import HomeScene from "../HomeScene";
import ParallaxGroup from "./ParallaxGroup";

export default class World {
    parallaxGroup = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;

        this.parallaxGroup = new ParallaxGroup();

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ wireframe: true })
        );
        this.parallaxGroup.group.add(testMesh);
    }

    update() {
        this.parallaxGroup.update();
    }
}
