//lib
import gsap from "./lib/gsap";
import lenis from "./lib/lenis";

// class
import Bus from "./class/Bus";
import Time from "./class/Time";

// modules
import { HomeScene } from "./modules";

let _instance = null;
export default class App {
    constructor() {
        // Singleton
        if (_instance) {
            return _instance;
        }
        _instance = this;
        this.bus = new Bus();
        this.time = new Time();
        this.homeScene = new HomeScene();

        this.update = this.update.bind(this);

        this.init();
    }

    update() {
        // unify external lib rafs
        gsap.updateRoot(this.time.elapsed);
        lenis.raf(this.time.elapsed * 1000); // lenis requires time in milliseconds

        // update modules
        if (this.homeScene) {
            this.homeScene.update();
        }
    }

    bindListeners() {
        this.time.on("tick", this.update);
    }

    initModules() {
        this.homeScene.init();
        console.log("Modules: init");
    }

    init() {
        this.bindListeners();
        this.initModules();
        this.bus.emit("app: init");
        console.log("App: init");
    }
}