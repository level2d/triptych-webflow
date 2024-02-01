import { default as SoundIndicatorComponent } from "@/js/components/SoundIndicator";
import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";

export default class SoundIndicator {
    enabled = false;
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.soundIndicator;
    }

    init() {
        if (this.$target?.length > 0) {
            this.enabled = true;
            renderToDOMElement(this.$target[0], SoundIndicatorComponent);
            console.log("Module: Audio Toggle: init");
        }
    }
}
