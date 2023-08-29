//lib
import gsap from "./lib/gsap";

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
