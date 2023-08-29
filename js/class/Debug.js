import * as dat from "lil-gui";

export default class Debug {
    active = false;
    ui = null;

    constructor() {
        this.active =
            new URLSearchParams(window.location.search).get("debug") === "true";

        this.init();
    }

    init() {
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
