import { default as LoaderComponent } from "@/js/components/Loader";
import { renderToDOMElement } from "@/js/util/react";
import { useStore } from "@/js/lib/store";
import App from "@/js/App";

export default class Loader {
    renderTarget = null;
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.body;
    }

    bindListeners() {
        $(window).on("load", () => {
            console.log("Window: load");
            useStore.getState().setLoaderPageLoaded(true);
        });
    }

    init() {
        if (this.$target) {
            this.bindListeners();
            this.renderTarget = document.createElement("div");
            this.renderTarget.id = "loader";
            this.$target[0].appendChild(this.renderTarget);
            renderToDOMElement(this.renderTarget, LoaderComponent);
            console.log("Module: Loader: init");
        }
    }
}
