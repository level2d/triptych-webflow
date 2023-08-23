import * as THREE from "three";
import HomeScene from "../HomeScene";

const sceneMargin = 0;
export default class Locations {
    model = null;
    modelBox = null;
    modelSize = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.resources = this.homeScene.resources;
        this.camera = this.homeScene.camera;
        this.parallaxGroup = this.homeScene.world.parallaxGroup;

        // setup
        this.resource = this.resources.items.locationsModel;
        this.setModel();
    }

    setModel() {
        const {
            parallaxGroup: { group },
        } = this;

        const model = this.resource.scene;
        const modelBox = new THREE.Box3().setFromObject(model);
        const modelSize = modelBox.getSize(new THREE.Vector3());

        model.name = "Locations";
        model.position.set(0, 0, 0);
        model.renderOrder = 2;

        group.add(model);

        this.model = model;
        this.modelBox = modelBox;
        this.modelSize = modelSize;
        this.resize();
    }

    /**
     * @description scales the root group to fit the camera bounds
     */
    resize() {
        const {
            camera: { instance: camera },
            model,
            modelSize,
        } = this;
        if (camera && model && modelSize) {
            const cameraWidth = camera.right - camera.left;
            const cameraHeight = camera.top - camera.bottom;
            let scale = null;

            if (cameraWidth < modelSize.x || cameraHeight < modelSize.z) {
                // scale down
                scale = Math.min(
                    cameraWidth / (modelSize.x + sceneMargin),
                    cameraHeight / (modelSize.z + sceneMargin)
                );
            } else {
                // scale up
                scale = Math.min(
                    (modelSize.x + sceneMargin) / cameraWidth,
                    (modelSize.z + sceneMargin) / cameraHeight
                );
            }
            model.scale.set(scale, scale, scale);
        }
    }
}
