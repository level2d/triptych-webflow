import * as THREE from "three";

import HomeScene from "../HomeScene";
import ParallaxGroup from "./ParallaxGroup";
import Locations from "./Locations";

export default class World {
    parallaxGroup = null;
    locations = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;

        this.parallaxGroup = new ParallaxGroup();

        this.handleResourcesReady = this.handleResourcesReady.bind(this);

        this.resources.on("ready", this.handleResourcesReady);
    }

    handleResourcesReady() {
        this.locations = new Locations();
    }

    update() {
        this.parallaxGroup.update();
    }

    resize() {
        if (this.locations?.model) {
            this.locations.resize();
        }
    }
}
