import { default as SoundIndicatorComponent } from "@/js/components/SoundIndicator";
import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";

export default class SoundIndicator {
    enabled = false;
    renderTarget = null;
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.document;
    }

    bindListeners() {}

    init() {
        if (this.$target) {
            this.enabled = true;
            this.bindListeners();
            this.renderTarget = document.createElement("div");
            this.renderTarget.id = "audio-toggle";
            this.$target.prepend(this.renderTarget);
            renderToDOMElement(this.renderTarget, SoundIndicatorComponent);
            console.log("Module: Audio Toggle: init");
        }
    }
}
