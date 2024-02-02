import { Howl } from "howler";

import App from "@/js/App";

export default class Soundboard {
    enabled = false;
    renderTarget = null;
    $target = null;
    app = null;
    sounds = {
        bump: null,
        click: null,
        subpages_soundtrack: null,
    };
    constructor() {
        this.app = new App();
        this.$triggers = this.app.core.dom.sfxTrigger;
        this.$soundtrackTriggers = this.app.core.dom.soundtrackTrigger;
        this.homeIframe = this.app.core.dom.homeIframe;
        this.sounds.bump = new Howl({
            src: [this.app.core.constants.SOUNDS.bump],
        });
        this.sounds.click = new Howl({
            src: [this.app.core.constants.SOUNDS.click],
        });
        this.sounds.subpages_soundtrack = new Howl({
            src: [this.app.core.constants.SOUNDS.subpages],
            loop: true,
        });
    }

    setMuteHomeExperience(isMuted) {
        if (this.homeIframe.length === 0) return;
        const data = isMuted ? "mute" : "unmute";
        Array.from(this.homeIframe).forEach((iframe) => {
            iframe.contentWindow.postMessage(data, iframe.src);
        });
    }

    mute() {
        this.setMuteHomeExperience(true);
        Object.keys(this.sounds).forEach((sound) => {
            this.sounds[sound].mute(true);
        });
    }

    unmute() {
        this.setMuteHomeExperience(false);
        Object.keys(this.sounds).forEach((sound) => {
            this.sounds[sound].mute(false);
        });
    }

    bindTriggers() {
        Array.from(this.$triggers).forEach((triggerEl) => {
            const events = triggerEl
                .getAttribute("data-sfx-trigger")
                .split(" ");

            events.forEach((event) => {
                switch (event) {
                    case "click":
                        triggerEl.addEventListener("click", () => {
                            this.sounds.click.play();
                        });
                        break;
                    case "hover":
                        triggerEl.addEventListener("mouseenter", () => {
                            this.sounds.bump.play();
                        });
                        break;
                    default:
                        break;
                }
            });
        });
    }

    bindListeners() {
        this.app.bus.on("Module: Soundboard: mute", () => {
            this.mute();
        });

        this.app.bus.on("Module: Soundboard: unmute", () => {
            this.unmute();
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.mute();
            } else {
                this.unmute();
            }
        });

        this.bindTriggers();
    }

    initSoundtracks() {
        Array.from(this.$soundtrackTriggers).forEach((triggerEl) => {
            const soundtrack = triggerEl.getAttribute(
                "data-soundtrack-trigger",
            );
            this.sounds[soundtrack].play();
        });
    }

    init() {
        this.enabled = true;
        this.bindListeners();
        this.initSoundtracks();
        console.log("Module: Soundboard: init");
    }
}
