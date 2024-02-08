import { Howl, Howler } from "howler";

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
        this.sounds.four_oh_four_soundtrack = new Howl({
            src: [this.app.core.constants.SOUNDS.four_oh_four],
            loop: true,
        });
    }

    playSoundtracks() {
        Array.from(this.$soundtrackTriggers).forEach((triggerEl) => {
            const soundtrack = triggerEl.getAttribute(
                "data-soundtrack-trigger",
            );
            this.sounds[soundtrack].play();
        });
    }

    pauseSoundtracks() {
        Array.from(this.$soundtrackTriggers).forEach((triggerEl) => {
            const soundtrack = triggerEl.getAttribute(
                "data-soundtrack-trigger",
            );
            this.sounds[soundtrack].pause();
        });
    }

    setMuteHomeExperience(isMuted) {
        if (this.homeIframe.length === 0) return;
        const data = isMuted ? "mute" : "unmute";
        Array.from(this.homeIframe).forEach((iframe) => {
            iframe.contentWindow.postMessage(data, iframe.src);
        });
    }

    playHomeExperienceBgTrack() {
        if (this.homeIframe.length === 0) return;
        const data = "play";
        Array.from(this.homeIframe).forEach((iframe) => {
            iframe.contentWindow.postMessage(data, iframe.src);
        });
    }

    pauseHomeExperienceBgTrack() {
        if (this.homeIframe.length === 0) return;
        const data = "pause";
        Array.from(this.homeIframe).forEach((iframe) => {
            iframe.contentWindow.postMessage(data, iframe.src);
        });
    }

    mute() {
        console.log("Muting");
        this.setMuteHomeExperience(true);
        Howler.mute(true);
    }

    unmute() {
        console.log("Unmuting");
        this.setMuteHomeExperience(false);
        Howler.mute(false);
    }

    play() {
        console.log("Playing");
        this.playHomeExperienceBgTrack();
        this.playSoundtracks();
    }

    pause() {
        console.log("Pausing");
        this.pauseHomeExperienceBgTrack();
        this.pauseSoundtracks();
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
        this.app.bus.on("App: muted", (muted) => {
            if (muted) {
                this.mute();
            } else {
                this.unmute();
                if (document.visibilityState !== "visible") {
                    this.pause();
                }
            }
        });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                this.play();
            } else if (!this.app.muted) {
                this.pause();
            }
        });

        this.bindTriggers();
    }

    init() {
        this.enabled = true;
        this.bindListeners();
        this.playSoundtracks();
        console.log("Module: Soundboard: init");
    }
}
