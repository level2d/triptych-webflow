import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";
import BgScene from "../components/BackgroundFx/BackgroundFx";

export default class BackgroundFx{
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$targets = this.app.core.dom.backgroundFx;
    }

    init() {
        if (this.$targets.length > 0) {
            this.instances = Array.from(this.$targets).map((target) =>
                renderToDOMElement(target, BgScene),
            );
            console.log("Module: BackgroundFx: init");
        }
    }
}
