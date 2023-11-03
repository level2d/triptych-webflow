import HomeScene from "@/js/components/HomeScene/HomeScene";
import { renderToDOMElement } from "@/js/util/react";
import App from "@/js/App";
import BgScene from "../components/BackgroundFx/BackgroundFx";

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

            //  renderToDOMElement(this.$target, HomeScene);
            renderToDOMElement(this.$target, BgScene);
        }
    }
}
