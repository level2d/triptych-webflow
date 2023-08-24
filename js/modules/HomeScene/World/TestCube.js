import * as THREE from "three";

import HomeScene from "../HomeScene";

export default class TestCube {
    model = null;
    constructor() {
        this.homeScene = new HomeScene();
        this.rootGroup = this.homeScene.world.rootGroup;
        this.resources = this.homeScene.resources;

        this.resource = this.resources.items.testCubeModel;
        this.setModel();
    }

    setModel() {
        const {
            rootGroup: { group, box },
        } = this;

        this.model = this.resource.scene;
        this.model.position.set(0, 0, 0);

        /**
         * Scale model to fit root group box
         */
        const rootBox = new THREE.Box3().setFromObject(box);
        const rootBoxSize = rootBox.getSize(new THREE.Vector3()); // get the size of the bounding box mesh
        const modelBox = new THREE.Box3().setFromObject(this.model);
        const modelSize = modelBox.getSize(new THREE.Vector3()); // get the size of the bounding box of the model
        const ratio = rootBoxSize.divide(modelSize); // get the ratio of the sizes
        const maxRatio = Math.max(ratio.x, ratio.y, ratio.z); // get the model bounding box's largest value
        this.model.scale.set(
            this.model.scale.x * maxRatio,
            this.model.scale.y * maxRatio,
            this.model.scale.z * maxRatio
        );

        group.add(this.model);
    }

    setItems() {}
}
