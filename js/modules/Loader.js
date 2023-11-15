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
            let interval = setInterval(() => {
                const currentProgress = useStore.getState().loaderProgress;
                let nextProgress = currentProgress + 0.1;
                nextProgress = Math.round(nextProgress * 10) / 10;
                console.log({
                    currentProgress,
                    nextProgress,
                });
                if (currentProgress >= 1.0) {
                    clearInterval(interval);
                    interval = null;
                    console.log("App: load");
                } else {
                    useStore.getState().setLoaderProgress(nextProgress);
                }
            }, 100);
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
