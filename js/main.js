import "@/styles/main.css";

class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("App: init");
        });
    }
}

const triptychApp = new App();
window.triptychApp = triptychApp;
