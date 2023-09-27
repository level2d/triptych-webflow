import gsap from "@/js/lib/gsap";

import App from "@/js/App";

class _ScrambleText {
    el = null;
    timeline = null;
    text = "";
    height = 0;
    constructor(el) {
        this.el = el;
        this.init();
    }

    initTimeline() {
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: this.el,
                start: "top+=15% bottom-=15%",
                once: true,
            },
            onComplete: () => {
                this.el.style.height = "auto";
            },
        });

        this.timeline.to(this.el, {
            scrambleText: {
                text: this.text,
                chars: "upperAndLowerCase",
                speed: 1,
                delimiter: " ",
            },
        });
    }

    setHeight() {
        this.height = this.el.offsetHeight;
        this.el.style.height = this.height + "px";
    }

    setText() {
        if (this.el.dataset.text) {
            this.text = this.el.dataset.text;
        } else {
            this.text = this.el.innerHTML;
            this.el.innerHTML = ""; // remove the text
        }
    }

    init() {
        this.setHeight();
        this.setText();
        this.initTimeline();
    }
}

export default class ScrambleText {
    app = null;
    $targets = null;
    instances = [];
    constructor() {
        this.app = new App();
        this.$targets = this.app.core.dom.scrambleText;
    }

    init = () => {
        if (this.$targets.length > 0) {
            this.instances = Array.from(this.$targets).map(
                (target) => new _ScrambleText(target),
            );

            console.log("Module: ScrambleText: init");
        }
    };
}
