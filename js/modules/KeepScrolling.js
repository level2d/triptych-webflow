import { ScrollTrigger } from "@/js/lib/gsap";

import App from "@/js/App";

const DownArrow = /* html */ `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            transform="rotate(180 0 0)"
        >
            <path
                d="M5.99919 16L5.99919 1.61749M5.99919 1.61749L0.935891 6.68079M5.99919 1.61749L11.0625 6.68079"
            />
        </svg>
`;

const activeClassname = "keep-scrolling--active";

export default class KeepScrolling {
    app = null;
    $target = null;
    el = null;
    scrollTrigger = null;
    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.keepScrolling[0]; // only support 1 instance per page
    }

    render() {
        const template = /* html */ `
            <div class="js-keep-scrolling keep-scrolling">
                <div class="keep-scrolling__inner">
                    <div class="keep-scrolling__text">
                        Keep Scrolling
                    </div>
                    <div class="keep-scrolling__arrow">
                        ${DownArrow}
                    </div>
                </div>
                <div class="keep-scrolling__bg"></div>
            </div>
        `;

        this.$target.innerHTML = template;

        // update cache
        this.el = this.$target.querySelector(".js-keep-scrolling");
    }

    initScrollTrigger = () => {
        this.scrollTrigger = ScrollTrigger.create({
            trigger: this.app.core.dom.document,
            start: "top-=1px top",
            end: "bottom-=100px bottom",
            once: false,
            onEnter: () => {
                this.el.classList.add(activeClassname);
            },
            onEnterBack: () => {
                this.el.classList.add(activeClassname);
            },
            onLeave: () => {
                this.el.classList.remove(activeClassname);
            },
            onLeaveBack: () => {
                this.el.classList.remove(activeClassname);
            },
        });
    };

    init() {
        if (this.$target) {
            console.log("module: KeepScrolling: init");
            this.render();
            this.initScrollTrigger();
        }
    }
}
