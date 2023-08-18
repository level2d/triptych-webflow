import "@/styles/main.scss";

import { homeScene, homeScene2 } from "./modules";
class App {
    constructor() {
        this.homeScene = homeScene;
        this.homeScene2 = homeScene2;
        this.init();
    }

    initModules() {
        this.homeScene.init();
        this.homeScene2.init();
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
