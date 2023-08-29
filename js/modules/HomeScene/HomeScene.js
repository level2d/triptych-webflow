import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

import App from "@/js/App";
import Debug from "@/js/class/Debug";
import Sizes from "@/js/class/Sizes";
import Resources from "@/js/class/Resources";

import Cursor from "./Cursor";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World";
import sources from "./sources";
import FxComposer from "./FxComposer";

THREE.ColorManagement.enabled = false;

let _instance = null;
export default class HomeScene {
    /**
     * Props
     */
    // Global
    debug = null;
    sizes = null;
    time = null;
    cursor = null;
    resources = null;

    // DOM cache
    rootEl = null;
    frameEl = null;
    canvas = null;
    confirmButtonEl = null;

    //3d cache
    scene = null;
    camera = null;
    renderer = null;
    raycaster = null;
    fxComposer = null;
    world = null;

    constructor() {
        // Singleton
        if (_instance) {
            return _instance;
        }
        _instance = this;

        this.app = new App();
        this.time = this.app.time;
        this.resize = this.resize.bind(this);
        this.update = this.update.bind(this);
    }

    render() {
        this.rootEl.innerHTML = `
            <div class="js-home-scene home-scene">
                <div class="home-scene__inner">
                    <canvas class="js-home-scene__canvas home-scene__canvas"></canvas>
                    <button class="js-home-scene__confirm-button home-scene__confirm-button"></button>
                </div>
            </div>
        `;

        // update DOM cache
        this.frameEl = this.rootEl.querySelector(".js-home-scene");
        this.canvas = this.rootEl.querySelector("canvas.js-home-scene__canvas");
        this.confirmButtonEl = this.rootEl.querySelector(
            "button.js-home-scene__confirm-button"
        );
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.fxComposer.update();

        // Update stats
        if (this.stats) {
            this.stats.update();
        }
    }

    bindListeners() {
        this.sizes.on("resize", this.resize);
        this.time.on("tick", this.update);
    }

    setup() {
        this.debug = new Debug();
        this.sizes = new Sizes(this.frameEl);
        this.resources = new Resources(sources);
        this.cursor = new Cursor(this.frameEl);
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.fxComposer = new FxComposer();
        this.raycaster = new THREE.Raycaster();
        this.world = new World();

        /**
         * Debuggers
         */
        if (this.debug.active) {
            const axesHelper = new THREE.AxesHelper(5);
            this.scene.add(axesHelper);
            this.axesHelper = axesHelper;

            const stats = new Stats();
            this.rootEl.appendChild(stats.dom);
            this.stats = stats;
        }
    }

    init() {
        this.rootEl = document.querySelector("[data-module='home-scene']");
        if (!this.rootEl) {
            return;
        }
        this.render();
        this.setup();
        this.bindListeners();
        console.log("module: HomeScene: init");
    }

    destroy() {
        this.debug.destroy();
        this.sizes.destroy();
    }
}
