//lib
import gsap from "./lib/gsap";
import lenis from "./lib/lenis";

// class
import Bus from "./class/Bus";
import Time from "./class/Time";
import Sizes from "./class/Sizes";

// modules
import * as core from "./core";
import { FancyImage, HomeExperience, PopQuote, test } from "./modules";

let _instance = null;
export default class App {
    constructor() {
        // Singleton
        if (_instance) {
            return _instance;
        }
        _instance = this;
        this.core = core;
        this.bus = new Bus();
        this.time = new Time();
        this.sizes = new Sizes();
        this.fancyImage = new FancyImage();
        this.homeExperience = new HomeExperience();
        this.popQuote = new PopQuote();
        this.test = test;

        this.update = this.update.bind(this);
        this.resize = this.resize.bind(this);
        this.resizeEnd = this.resizeEnd.bind(this);

        this.init();
    }

    update() {
        // unify external lib rafs
        gsap.updateRoot(this.time.elapsed);
        lenis.raf(this.time.elapsed * 1000); // lenis requires time in milliseconds
    }

    resize() {}

    resizeEnd() {
        this.fancyImage.resize();
    }

    bindListeners() {
        this.time.on("tick", this.update);
        this.sizes.on("resize", this.resize);
        this.sizes.on("window resize end", this.resizeEnd);
    }

    initModules() {
        this.fancyImage.init();
        this.homeExperience.init();
        this.popQuote.init();
        this.test.init();
        console.log("Modules: init");
    }

    init() {
        this.bindListeners();
        this.initModules();
        this.bus.emit("app: init");
        console.log("App: init");
    }
}
