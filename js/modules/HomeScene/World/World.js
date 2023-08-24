import EventEmitter from "events";
import gsap from "gsap";

import HomeScene from "../HomeScene";
import Environment from "./Environment";
import ParallaxGroup from "./ParallaxGroup";
import Locations from "./Locations";

export default class World extends EventEmitter {
    environment = null;
    parallaxGroup = null;
    locations = null;

    constructor() {
        super();
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.scene = this.homeScene.scene;
        this.camera = this.homeScene.camera;
        this.resources = this.homeScene.resources;

        this.setup = this.setup.bind(this);

        this.resources.on("ready", this.setup);
    }

    update() {
        if (this.parallaxGroup) {
            this.parallaxGroup.update();
        }
        if (this.locations) {
            this.locations.update();
        }
    }

    resize() {
        if (this.locations) {
            this.locations.resize();
        }
    }

    setup() {
        this.parallaxGroup = new ParallaxGroup();
        this.locations = new Locations();
        this.environment = new Environment();
    }
}
