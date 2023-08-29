import EventEmitter from "events";

import HomeScene from "../HomeScene";
import Environment from "./Environment";
import RootGroup from "./RootGroup";
import TestCube from "./TestCube";

export default class World extends EventEmitter {
    environment = null;
    parallaxGroup = null;
    locations = null;
    rootGroup = null;
    testCube = null;

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
        if (this.testCube) {
            this.testCube.update();
        }
    }

    resize() {
        if (this.rootGroup) {
            this.rootGroup.resize();
        }
        if (this.locations) {
            this.locations.resize();
        }
    }

    setup() {
        this.rootGroup = new RootGroup();
        this.testCube = new TestCube();
        this.environment = new Environment();
    }
}
