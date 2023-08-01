import "@/styles/main.scss";

import { homeScene } from "./modules";
class App {
    constructor() {
        this.init();
        this.homeScene = homeScene;
    }

    initModules() {
        this.homeScene.init();
    }

    init() {
        const _this = this;
        document.addEventListener("DOMContentLoaded", () => {
            _this.initModules();
            console.log("App: init");
        });
    }
}

const triptychApp = new App();
window.triptychApp = triptychApp;
