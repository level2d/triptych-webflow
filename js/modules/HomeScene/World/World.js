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

        this.intro = this.intro.bind(this);
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
        if (this.locations?.model) {
            this.locations.resize();
        }
    }

    setup() {
        this.parallaxGroup = new ParallaxGroup();
        this.locations = new Locations();
        this.environment = new Environment();

        if (this.debug.active) {
            this.debug.ui
                .add({ intro: this.intro }, "intro")
                .name("Play Intro");
        } else {
            this.intro();
        }
    }

    intro() {
        const {
            camera: { instance: camera },
            locations: { model },
        } = this;
        // Intro animation
        const tl = gsap.timeline({
            paused: true,
        });
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
