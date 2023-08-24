import * as THREE from "three";
import gsap from "gsap";

import HomeScene from "../HomeScene";

const padding = 0.2;

export default class RootGroup {
    group = null;
    box = null;
    folder = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.camera = this.homeScene.camera;
        this.parallaxGroup = this.homeScene.world.parallaxGroup;

        // setup
        this.rotate = this.rotate.bind(this);

        this.setGroup();
        this.setBox();
    }

    setGroup() {
        this.group = new THREE.Group();
        this.group.name = "rootGroup";
        this.parallaxGroup.group.add(this.group);
    }

    setBox() {
        this.box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: "red",
                wireframe: true,
            })
        );

        this.group.add(this.box);
        this.resize();

        if (this.debug.active) {
            this.folder = this.debug.ui.addFolder("Root Group");
            this.folder
                .add(
                    {
                        rotateRight: () => {
                            this.rotate("right");
                        },
                    },
                    "rotateRight"
                )
                .name("Rotate Right");
            this.folder
                .add(
                    {
                        rotateLeft: () => {
                            this.rotate("left");
                        },
                    },
                    "rotateLeft"
                )
                .name("Rotate Left");
            this.folder
                .add(
                    {
                        rotateUp: () => {
                            this.rotate("up");
                        },
                    },
                    "rotateUp"
                )
                .name("Rotate Up");
            this.folder
                .add(
                    {
                        rotateDown: () => {
                            this.rotate("down");
                        },
                    },
                    "rotateDown"
                )
                .name("Rotate Down");
        }
    }

    /**
     * @description update camera to fit RootGroup boundingBox bounds
     */
    resize() {
        this.camera.controls.fitToBox(this.box, true, {
            paddingTop: padding,
            paddingRight: padding,
            paddingBottom: padding,
            paddingLeft: padding,
        });
    }

    async rotate(direction = "right") {
        const {
            camera: { instance: camera, controls },
            group,
            box,
        } = this;

        const rotation = new THREE.Euler();
        rotation.copy(group.rotation);

        const tl = gsap.timeline({
            pause: true,
            onComplete: () => {
                camera.lookAt(group.position);
                controls.update();
            },
        });

        switch (direction) {
            case "left": {
                tl.to(group.rotation, {
                    x: (rotation.x += Math.PI * 0.25),
                    y: (rotation.y += Math.PI * 0.25),
                });
                tl.to(group.rotation, {
                    x: (rotation.x -= Math.PI * 0.25),
                    y: (rotation.y += Math.PI * 0.25),
                });
                break;
            }
            case "up": {
                tl.to(group.rotation, {
                    x: (rotation.x += Math.PI * 0.5),
                });
                break;
            }
            case "down": {
                tl.to(group.rotation, {
                    x: (rotation.x -= Math.PI * 0.5),
                });
                break;
            }
            case "right":
            default: {
                tl.to(group.rotation, {
                    x: (rotation.x += Math.PI * 0.25),
                    y: (rotation.y -= Math.PI * 0.25),
                });
                tl.to(group.rotation, {
                    x: (rotation.x -= Math.PI * 0.25),
                    y: (rotation.y -= Math.PI * 0.25),
                });
                break;
            }
        }
        return tl;
    }
}
