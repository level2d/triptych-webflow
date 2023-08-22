import * as THREE from "three";
import gsap from "gsap";
import HomeScene from "../HomeScene";

const sceneMargin = 0;
export default class Locations {
    model = null;
    modelBox = null;
    modelSize = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
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
            camera: { instance: camera },
            debug,
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

        if (camera.controls) {
            // set camera orbit to this mesh if controls exist
            camera.controls.setTarget(
                model.position.x,
                model.position.y,
                model.position.z
            );
        }

        // Intro animation
        const intro = () => {
            const tl = gsap.timeline({
                paused: true,
            });
            tl.fromTo(
                model.rotation,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                {
                    duration: 2,
                    ease: "power2.inOut",
                    x: Math.PI * 0.5,
                    y: 0,
                    z: 0,
                },
                0
            );
            tl.fromTo(
                camera.position,
                {
                    x: 1,
                    y: 0,
                    z: 1,
                },
                {
                    duration: 2,
                    ease: "power2.inOut",
                    x: 0,
                    y: 0,
                    z: 1,
                },
                0
            );

            tl.play();
        };
        if (debug.active) {
            debug.ui.add({ intro }, "intro").name("Play Intro");
        }
        intro();
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
