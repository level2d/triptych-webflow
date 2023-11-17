import { default as LoaderComponent } from "@/js/components/Loader";
import { renderToDOMElement } from "@/js/util/react";
import { useStore } from "@/js/lib/store";
import App from "@/js/App";

export default class Loader {
    enabled = false;
    renderTarget = null;
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.loader[0];
    }

    bindListeners() {
        $(document).ready(() => {
            console.log("Module: Loader: Document ready");
            useStore.getState().setLoaderPageLoaded(true);
            this.$target.classList.add("is-ready");
        });
    }

    init() {
        if (this.$target) {
            this.enabled = true;
            this.bindListeners();
            this.renderTarget = document.createElement("div");
            this.renderTarget.id = "loader";
            this.$target.prepend(this.renderTarget);
            renderToDOMElement(this.renderTarget, LoaderComponent);
            console.log("Module: Loader: init");
        }
    }
}
