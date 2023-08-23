import EventEmitter from "events";

import HomeScene from "../HomeScene";
import ParallaxGroup from "./ParallaxGroup";
import Locations from "./Locations";

export default class World extends EventEmitter {
    parallaxGroup = null;
    locations = null;

    constructor() {
        super();
        this.homeScene = new HomeScene();
        this.scene = this.homeScene.scene;
        this.resources = this.homeScene.resources;

        this.parallaxGroup = new ParallaxGroup();

        this.handleResourcesReady = this.handleResourcesReady.bind(this);

        this.resources.on("ready", this.handleResourcesReady);
    }

    handleResourcesReady() {
        this.locations = new Locations();

        this.emit("ready");
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
