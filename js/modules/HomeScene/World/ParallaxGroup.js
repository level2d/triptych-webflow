import * as THREE from "three";
import { damp3 } from "maath/easing";

import HomeScene from "../HomeScene";

export default class ParallaxGroup {
    group = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.cursor = this.homeScene.cursor;
        this.time = this.homeScene.time;

        this.setGroup();
    }

    setGroup() {
        const { scene } = this;
        const group = new THREE.Group();
        group.name = "parallaxGroup";
        scene.add(group);

        this.group = group;
    }

    update() {
        const { cursor, group, time } = this;
        const { delta } = time;

        // Animate parallaxGroup
        const parallaxFactor = 0.1;
        const parallaxX = -(cursor.x * parallaxFactor);
        const parallaxY = -(cursor.y * parallaxFactor);
        const parallaxPositionX = parallaxX - group.position.x;
        const parallaxPositionY = parallaxY - group.position.y;
        damp3(
            group.position,
            [parallaxPositionX, parallaxPositionY, 0],
            0.25,
            delta
        );
    }
}
