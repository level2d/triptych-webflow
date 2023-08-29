import HomeScene from "./HomeScene";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

export default class FxComposer {
    instance = null;
    renderPass = null;

    constructor() {
        this.homeScene = new HomeScene();
        this.sizes = this.homeScene.sizes;
        this.scene = this.homeScene.scene;
        this.camera = this.homeScene.camera;
        this.renderer = this.homeScene.renderer;

        this.setInstance();
        this.setRenderPass();
    }

    setInstance() {
        this.instance = new EffectComposer(this.renderer.instance);
        this.resize();
    }

    setRenderPass() {
        const { instance: effectComposer } = this;
        this.renderPass = new RenderPass(this.scene, this.camera.instance);
        effectComposer.addPass(this.renderPass);
    }

    resize() {
        const { instance: effectComposer, sizes } = this;
        effectComposer.setSize(sizes.width, sizes.height);
        effectComposer.setPixelRatio(sizes.pixelRatio);
    }

    update() {
        const { instance: effectComposer } = this;
        effectComposer.render();
    }
}
