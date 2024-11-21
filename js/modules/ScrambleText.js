import gsap from "@/js/lib/gsap";

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
                start: "top+=30% bottom-=30%",
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
                delimiter: " ",
                revealDelay: 0.5,
                speed: 0.5,
                tweenLength: false,
            },
        });
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
        this.setText();
        this.initTimeline();
    }
}

export default class ScrambleText {
    app = null;
    $targets = null;
    instances = [];
    constructor(app) {
        this.app = app;
        this.$targets = this.app.core.dom.scrambleText;
    }

    init = () => {
        this.app.bus.on("App: loaded", () => {
            if (this.$targets.length > 0) {
                this.instances = Array.from(this.$targets).map(
                    (target) => new _ScrambleText(target),
                );

                console.log("Module: ScrambleText: init");
            }
        });
    };
}
