import "@/styles/main.scss";

import { HomeScene } from "./modules";
class App {
    constructor() {
        this.homeScene = new HomeScene();
        this.init();
    }

    initModules() {
        this.homeScene.init();
        console.log("Modules: init");
    }

    init() {
        const _this = this;
        _this.initModules();
        console.log("App: init");
    }
}

const app = new App();
window.app = app;
