import EventEmitter from "events";

import HomeScene from "./HomeScene";

export default class Cursor extends EventEmitter {
    targetNode = null;
    x = 0;
    y = 0;

    constructor(targetNode) {
        super();
        this.targetNode = targetNode ?? window;

        this.homeScene = new HomeScene();
        this.sizes = this.homeScene.sizes;

        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleMouseleave = this.handleMouseleave.bind(this);

        this.init();
    }

    handleMousemove(e) {
        window.requestAnimationFrame(() => {
            const { sizes } = this;
            const { clientX, clientY } = e;
            // normalize x/y values to a range of -1 to 1.
            const x = (clientX / sizes.width - 0.5) * 2;
            const y = (clientY / sizes.height - 0.5) * 2;
            this.x = x;
            this.y = -y;

            this.emit("mousemove");
        });
    }

    handleMouseleave() {
        window.requestAnimationFrame(() => {
            // reset cursor position when mouse leaves targetNode
            this.x = 0;
            this.y = 0;

            this.emit("mouseleave");
        });
    }

    init() {
        this.targetNode.addEventListener("mousemove", this.handleMousemove);
        this.targetNode.addEventListener("mouseleave", this.handleMouseleave);
    }

    destroy() {
        this.targetNode.removeEventListener(
            "mousemove",
            this.rafHandleMousemove
        );
        this.targetNode.removeEventListener(
            "mouseleave",
            this.handleMouseleave
        );
    }
}
