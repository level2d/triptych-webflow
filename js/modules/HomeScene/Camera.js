import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import HomeScene from "./HomeScene";

export default class Camera {
    instance = null;
    controls = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.sizes = this.homeScene.sizes;
        this.scene = this.homeScene.scene;
        this.canvas = this.homeScene.canvas;

        this.setInstance();
        this.setControls();
    }

    setInstance() {
        const { sizes, scene } = this;
        const camera = new THREE.OrthographicCamera(
            -sizes.aspectRatio,
            sizes.aspectRatio,
            1,
            -1,
            0.1,
            10
        );
        camera.position.set(2, 0, 2);
        scene.add(camera);

        this.instance = camera;
    }

    setControls() {
        if (!this.debug.active) return;
        const controls = new OrbitControls(this.instance, this.canvas);
        // controls.target.set(0, 0, 0);
        // target is now set in the Locations class.
        controls.enableDamping = true;
        this.controls = controls;
    }

    resize() {
        const { instance: camera, sizes } = this;
        camera.left = -sizes.aspectRatio;
        camera.right = sizes.aspectRatio;
        camera.top = 1;
        camera.bottom = -1;

        camera.updateProjectionMatrix();
    }

    update() {
        const { controls, instance: camera } = this;
        if (controls) {
            // Update controls for rotating around root mesh
            controls.update();
        } else {
            // Force camera to look at root mesh
            camera.lookAt(new THREE.Vector3());
        }
    }
}
