import * as THREE from "three";
import { dampE } from "maath/easing";

import HomeScene from "../HomeScene";

const sceneMargin = 0;
export default class Locations {
    model = null;
    modelBox = null;
    modelSize = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;
        this.camera = this.homeScene.camera;
        this.cursor = this.homeScene.cursor;
        this.time = this.homeScene.time;
        this.raycaster = this.homeScene.raycaster;
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

        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
        const boxes = model.children
            .filter(({ name }) => name.includes("location"))
            .map((item, idx) => {
                const box = new THREE.Mesh(boxGeometry, boxMaterial.clone());
                box.name = `box-${idx}`;
                box.position.x = item.position.x;
                box.position.y = item.position.y;
                box.position.z = item.position.z;
                box.receiveShadow = true;
                box.castShadow = true;
                item.geometry.dispose();
                item.material.dispose();
                model.remove(item);
                return box;
            });
        boxes.forEach((box) => {
            model.add(box);
        });
        this.boxes = boxes;

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

    update() {
        if (this.boxes.length <= 0) return;

        const {
            boxes,
            raycaster,
            camera: { instance: camera },
            cursor,
            time: { delta },
        } = this;
        const mouse = new THREE.Vector2(cursor.x, cursor.y);

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(boxes);
        const intersectsNames = intersects.map(({ object: { name } }) => name);
        boxes.forEach((box) => {
            if (intersectsNames.includes(box.name)) {
                box.material.color.set("#0000ff");
            } else {
                box.material.color.set("#ff0000");
            }
            const x = -cursor.y * 0.5;
            const y = box.rotation.y;
            const z = -cursor.x * 0.5;
            dampE(box.rotation, [x, y, z], 0.25, delta);
        });
    }
}
