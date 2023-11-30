import gsap, { SplitText } from "@/js/lib/gsap";
import App from "@/js/App";

class _FadeInText {
    el = null;
    timeline = null;
    split = null;
    constructor(node) {
        this.app = new App();
        this.init(node);
    }

    setup() {
        this.split = new SplitText(this.el, {
            type: "chars, words",
        });
        gsap.set(this.split.chars, {
            opacity: 0,
            y: 100,
        });
    }

    initTimeline() {
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: this.el,
                start: "top+=20% bottom-=20%",
                once: true,
            },
        });

        this.timeline.set(this.split.words, {
            className: "word",
        });

        this.timeline.set(this.split.chars, {
            className: "letter",
        });

        this.timeline.fromTo(
            this.split.chars,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                stagger: (index) => {
                    return index * 0.03;
                },
                ease: "power2.outExpo",
            },
        );
    }

    init(node) {
        this.el = node;
        this.app = new App();
        this.setup();
        this.app.bus.on("App: loaded", () => {
            this.initTimeline();
        });
    }
}

export default class FadeInText {
    app = null;
    $targets = null;
    instances = [];
    constructor() {
        this.app = new App();
        this.$targets = this.app.core.dom.fadeInText;
    }

    init = () => {
        if (this.$targets.length > 0) {
            this.instances = Array.from(this.$targets).map(
                (target) => new _FadeInText(target),
            );
            console.log("Module: FadeInText: init");
        }
    };
}
