//lib
import gsap from "./lib/gsap";
import lenis from "./lib/lenis";

// class
import Bus from "./class/Bus";
import Time from "./class/Time";
import Sizes from "./class/Sizes";

// modules
import * as core from "./core";
import {
    SoundIndicator,
    BackgroundFx,
    FadeInText,
    FancyImage,
    KeepScrolling,
    Loader,
    PopQuote,
    ScrambleText,
    Soundboard,
    test,
} from "./modules";

let _instance = null;
export default class App {
    muted = false;

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
        this.soundIndicator = new SoundIndicator();
        this.fadeInText = new FadeInText();
        this.fancyImage = new FancyImage();
        this.backgroundFx = new BackgroundFx();
        this.keepScrolling = new KeepScrolling();
        this.loader = new Loader();
        this.popQuote = new PopQuote();
        this.scrambleText = new ScrambleText();
        this.soundboard = new Soundboard();
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
        this.bus.on("App: muted", (muted) => {
            this.muted = muted;
        });
    }

    initModules() {
        this.core.detect.init();
        this.loader.init(); // init loader before everything else
        this.soundIndicator.init();
        this.fadeInText.init();
        this.fancyImage.init();
        this.backgroundFx.init();
        this.keepScrolling.init();
        this.popQuote.init();
        this.scrambleText.init();
        this.soundboard.init();
        this.test.init();

        console.log("Modules: init");

        if (!this.loader.enabled) {
            // fallback event if loader is disabled
            this.bus.emit("App: loaded");
        }
    }

    init() {
        // reset scroll position
        window.scrollTo(0, 0);
        window.history.scrollRestoration = "manual";

        this.bindListeners();
        this.initModules();
        this.bus.emit("app: init");
        console.log("App: init");
    }
}
