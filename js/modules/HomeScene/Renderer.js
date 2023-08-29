import * as THREE from "three";
import HomeScene from "./HomeScene";

export default class Renderer {
    instance = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.debug = this.homeScene.debug;
        this.canvas = this.homeScene.canvas;
        this.sizes = this.homeScene.sizes;
        this.scene = this.homeScene.scene;
        this.camera = this.homeScene.camera;

        this.setInstance();
    }

    setInstance() {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.antialias = true;
        renderer.shadowMap.enabled = true;
        renderer.setSize(this.sizes.width, this.sizes.height);
        renderer.setPixelRatio(this.sizes.pixelRatio);
        renderer.setClearColor(0x000000);

        if (!this.debug.active) {
            renderer.setClearAlpha(0);
        }

        this.instance = renderer;
    }

    resize() {
        const { instance: renderer, sizes } = this;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(sizes.pixelRatio);
    }
}
