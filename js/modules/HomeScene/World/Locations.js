import * as THREE from "three";
import gsap from "gsap";
import { dampE, dampC } from "maath/easing";

import HomeScene from "../HomeScene";

const sceneMargin = 0;
export default class Locations {
    model = null;
    modelBox = null;
    modelSize = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;
        this.camera = this.homeScene.camera;
        this.cursor = this.homeScene.cursor;
        this.time = this.homeScene.time;
        this.raycaster = this.homeScene.raycaster;
        this.parallaxGroup = this.homeScene.world.parallaxGroup;

        // setup
        this.intro = this.intro.bind(this);
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

        const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
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
        boxMaterial.dispose();
        boxes.forEach((box) => {
            model.add(box);
        });
        this.boxes = boxes;

        group.add(model);

        this.model = model;
        this.modelBox = modelBox;
        this.modelSize = modelSize;
        this.resize();

        if (this.debug.active) {
            this.debug.ui
                .add({ intro: this.intro }, "intro")
                .name("Play Intro");
        } else {
            this.intro();
        }
    }

    /**
     * @description scales the root group to fit the camera bounds
     */
    resize() {
        if (!this.model) return;
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
        const coords = new THREE.Vector2(cursor.x, cursor.y);

        raycaster.setFromCamera(coords, camera);

        const intersects = raycaster.intersectObjects(boxes);
        const intersectsNames = intersects.map(({ object: { name } }) => name);
        boxes.forEach((box) => {
            if (intersectsNames.includes(box.name)) {
                // box.material.color.set("#0000ff");
                dampC(box.material.color, "#0000ff", 0.1, delta);
            } else {
                // box.material.color.set("#ff0000");
                dampC(box.material.color, "#ff0000", 0.1, delta);
            }
            const x = -cursor.y * 0.5;
            const y = box.rotation.y;
            const z = -cursor.x * 0.5;
            dampE(box.rotation, [x, y, z], 0.15, delta);
        });
    }

    intro() {
        const {
            camera: { instance: camera },
            model,
        } = this;

        const toScale = model.scale.clone();

        const tl = gsap.timeline({
            paused: true,
        });
        tl.fromTo(
            model.scale,
            {
                x: 0,
                y: 0,
                z: 0,
            },
            {
                x: toScale.x,
                y: toScale.y,
                z: toScale.z,
                duration: 1,
                ease: "power2.inOut",
            },
            0
        );
        tl.fromTo(
            camera.position,
            {
                x: 2,
                y: 0,
                z: 2,
            },
            {
                x: 0,
                y: 0,
                z: 2,
                duration: 2,
                ease: "power2.inOut",
            },
            0
        );
        tl.fromTo(
            model.rotation,
            { x: 0, y: 0, z: 0 },
            {
                x: Math.PI * 0.5,
                y: 0,
                z: 0,
                duration: 2,
                ease: "power2.inOut",
            },
            0
        );
        tl.play();
    }
}
