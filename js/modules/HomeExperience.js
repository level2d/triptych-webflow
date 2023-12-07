import HomeScene from "@/js/components/HomeScene";
import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";

export default class HomeExperience {
    $target = null;
    app = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.homeExperience[0]; // only support 1 scene per page
    }

    init() {
        if (this.$target) {
            console.log("Module: HomeExperience: init");

            renderToDOMElement(this.$target, HomeScene);
        }
    }
}
