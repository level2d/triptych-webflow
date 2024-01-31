import { default as AudioToggleComponent } from "@/js/components/AudioToggle";
import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";

export default class AudioToggle {
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
            renderToDOMElement(this.renderTarget, AudioToggleComponent);
            console.log("Module: Audio Toggle: init");
        }
    }
}
