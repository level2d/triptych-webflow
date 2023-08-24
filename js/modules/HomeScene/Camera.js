import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CameraControls from "camera-controls";

CameraControls.install({ THREE: THREE });

import HomeScene from "./HomeScene";

export default class Camera {
    instance = null;
    controls = null;
    hasControlsUpdated = false;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.sizes = this.homeScene.sizes;
        this.scene = this.homeScene.scene;
        this.canvas = this.homeScene.canvas;
        this.time = this.homeScene.time;

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
        camera.position.set(0, 0, 2);
        scene.add(camera);

        this.instance = camera;
    }

    setControls() {
        const controls = new CameraControls(this.instance, this.canvas);
        controls.enableDamping = true;

        this.controls = controls;
        if (!this.debug.active) {
            this.controls.disconnect();
        } else {
            const cameraFolder = this.debug.ui.addFolder("Camera");
            cameraFolder.add(
                {
                    reset: () => {
                        controls.reset(true);
                    },
                },
                "reset"
            );
        }
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
        const { controls, time } = this;
        const { delta } = time;

        controls.update(delta);
    }
}
