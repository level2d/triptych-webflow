import * as THREE from "three";
import { dampC, dampE } from "maath/easing";

import HomeScene from "../HomeScene";

export default class TestCube {
    model = null;
    items = [];
    currentIntersects = [];
    padding = 0.02; // padding to use for controls.fitToBox()

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.raycaster = this.homeScene.raycaster;
        this.camera = this.homeScene.camera;
        this.cursor = this.homeScene.cursor;
        this.time = this.homeScene.time;
        this.rootGroup = this.homeScene.world.rootGroup;
        this.parallaxGroup = this.homeScene.world.parallaxGroup;
        this.resources = this.homeScene.resources;

        this.resource = this.resources.items.testCubeModel;
        this.handleClick = this.handleClick.bind(this);
        this.setModel();
        this.setItems();
        this.bindListeners();
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

    setItems() {
        const mesh1 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.05, 0.01, 64, 8),
            new THREE.MeshStandardMaterial()
        );
        const mesh2 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.05, 0.01, 64, 8),
            new THREE.MeshStandardMaterial()
        );
        const mesh3 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.05, 0.01, 64, 8),
            new THREE.MeshStandardMaterial()
        );

        mesh1.name = "mesh1";
        mesh2.name = "mesh2";
        mesh3.name = "mesh3";
        mesh1.position.set(0.37, -0.38, 0.4);
        mesh2.position.set(0.12, 0.38, 0.4);
        mesh3.position.set(-0.12, 0.12, 0.4);

        this.rootGroup.group.add(mesh1, mesh2, mesh3);
        this.items = [mesh1, mesh2, mesh3];
    }

    update() {
        if (this.items.length <= 0) return;

        const {
            items,
            raycaster,
            camera: { instance: camera },
            cursor,
            time: { delta },
        } = this;
        const coords = new THREE.Vector2(cursor.x, cursor.y);

        raycaster.setFromCamera(coords, camera);
        this.currentIntersects = raycaster.intersectObjects(items);

        items.forEach((item) => {
            const x = -cursor.y * 0.5;
            const y = item.rotation.y;
            const z = -cursor.x * 0.5;
            dampE(item.rotation, [x, y, z], 0.15, delta);
        });

        if (this.rotatableItem) {
            this.rotatableItem.y += Math.PI * 0.01;
        }
    }

    async handleClick() {
        if (this.currentIntersects.length > 0) {
            const clickedItem = this.currentIntersects[0].object;
            return this.zoomItem(clickedItem);
        }
    }

    async zoomItem(item) {
        const targetPosition = item.getWorldPosition(new THREE.Vector3());
        const currentPosition = new THREE.Vector3();
        this.camera.controls.getPosition(currentPosition);

        await this.camera.controls.setLookAt(
            targetPosition.x,
            targetPosition.y,
            currentPosition.z,
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
            true
        );
        await this.camera.controls.fitToBox(item, true, {
            paddingTop: this.padding,
            paddingRight: this.padding,
            paddingBottom: this.padding,
            paddingLeft: this.padding,
        });
    }

    bindListeners() {
        window.addEventListener("click", this.handleClick);
    }
}
