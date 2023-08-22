import * as dat from "lil-gui";

export default class Debug {
    active = false;
    ui = null;

    constructor() {
        this.init();
    }

    init() {
        this.active =
            new URLSearchParams(window.location.search).get("debug") === "true";

        if (this.active) {
            this.ui = new dat.GUI();
        }
    }

    destroy() {
        if (this.ui) {
            this.ui.destroy();
            this.active = false;
        }
    }
}
