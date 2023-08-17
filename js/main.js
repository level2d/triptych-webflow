import "@/styles/main.scss";

import { homeScene } from "./modules";
class App {
    constructor() {
        this.homeScene = homeScene;
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

const triptychApp = new App();
window.triptychApp = triptychApp;
