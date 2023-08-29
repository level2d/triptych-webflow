import * as THREE from "three";
import HomeScene from "../HomeScene";

export default class Environment {
    debugFolder = null;
    ambientLight = null;
    directionalLight = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;
        this.debug = this.homeScene.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("environment");
        }

        this.setAmbientLight();
        this.setDirectionalLight();
    }

    setAmbientLight() {
        let { ambientLight } = this;
        const { scene } = this;
        ambientLight = new THREE.AmbientLight("#ffffff", 1);
        scene.add(ambientLight);
    }

    setDirectionalLight() {
        let { directionalLight } = this;
        const { scene, debug, debugFolder } = this;
        directionalLight = new THREE.DirectionalLight("#ffffff", 4);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.normalBias = 0.05;
        directionalLight.position.set(-1.5, 2.5, 1.8);
        scene.add(directionalLight);

        // Debug
        if (debug.active) {
            debugFolder
                .add(directionalLight, "intensity")
                .name("directionalLightIntensity")
                .min(0)
                .max(10)
                .step(0.001);

            debugFolder
                .add(directionalLight.position, "x")
                .name("directionalLightX")
                .min(-5)
                .max(5)
                .step(0.001);

            debugFolder
                .add(directionalLight.position, "y")
                .name("directionalLightY")
                .min(-5)
                .max(5)
                .step(0.001);

            debugFolder
                .add(directionalLight.position, "z")
                .name("directionalLightZ")
                .min(-5)
                .max(5)
                .step(0.001);
        }
    }
}
