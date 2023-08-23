import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

import Debug from "@/js/util/Debug";
import Time from "@/js/util/Time";
import Sizes from "@/js/util/Sizes";
import Resources from "@/js/util/Resources";

import Cursor from "./Cursor";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World";
import sources from "./sources";

THREE.ColorManagement.enabled = false;

let instance = null;
export default class HomeScene {
    /**
     * Props
     */
    // Global
    debug = null;
    sizes = null;
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
    world = null;

    constructor() {
        // Singleton
        if (instance) {
            return instance;
        }
        instance = this;

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
        this.renderer.update();
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
        this.time = new Time();
        this.sizes = new Sizes(this.frameEl);
        this.resources = new Resources(sources);
        this.cursor = new Cursor(this.frameEl);
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
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
        this.rootEl = document.querySelector(".js-home-scene-target");
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
