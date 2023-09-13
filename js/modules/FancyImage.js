import {
    canvas2d,
    GRAY8,
    intBufferFromImage,
    imagePromise,
} from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";
import * as intrinsicScale from "intrinsic-scale";

import App from "@/js/App";

class _FancyImage {
    DOM = {
        el: null,
        parentEl: null,
        container: null,
    };
    src = null;
    ditherEnabled = false;
    objectFit = "contain";

    constructor(node) {
        this.init(node);
    }

    resize = () => {
        this.DOM.container.classList.remove("fancy-image--ready");
        this.DOM.container.innerHTML = "";
        this.render();
    };

    render = async () => {
        // Create inner
        const inner = document.createElement("div");
        inner.classList.add("fancy-image__inner");

        // Detect image window size
        const { width, height } = this.DOM.el.getBoundingClientRect();

        // Load new image
        const img = await imagePromise(this.src);
        img.classList.add("fancy-image__img");

        // Calculate img and canvas sizing based on object fit mode
        const scaled = intrinsicScale[this.objectFit](
            width,
            height,
            img.naturalWidth,
            img.naturalHeight,
        );

        // Create image buf to render into canvas
        const buf = intBufferFromImage(img, GRAY8, scaled.width, scaled.height);

        // Create canvas
        const { canvas, ctx } = canvas2d(buf.width, buf.height);
        canvas.classList.add("fancy-image__canvas");
        ctx.fillStyle = "white";

        // Dither the image
        if (this.ditherEnabled) {
            ditherWith(ATKINSON, buf).blitCanvas(canvas);
        }

        // Apply object fit styles
        img.style.width = `${scaled.width}px`;
        img.style.height = `${scaled.height}px`;
        img.style.top = `${scaled.y}px`;
        img.style.left = `${scaled.x}px`;
        canvas.style.width = `${scaled.width}px`;
        canvas.style.height = `${scaled.height}px`;
        canvas.style.top = `${scaled.y}px`;
        canvas.style.left = `${scaled.x}px`;

        // Append everything to DOM
        inner.appendChild(img);
        inner.appendChild(canvas);
        this.DOM.container.appendChild(inner);
        this.DOM.container.classList.add("fancy-image--ready");
    };

    init = async (node) => {
        // setup
        this.DOM.el = node;
        this.DOM.parentEl = this.DOM.el.parentElement;
        this.DOM.parentEl.dataset.fancyImageParent = ""; // add parent positioning attribute
        this.DOM.container = document.createElement("div");
        this.DOM.container.classList.add("fancy-image");
        this.DOM.parentEl.appendChild(this.DOM.container); // app as next sibling of source node

        // settings from node
        this.src = this.DOM.el.src;
        this.objectFit = this.DOM.el.dataset.objectFit ?? "contain"; // object fit mode
        this.ditherEnabled =
            typeof this.DOM.el.dataset.ditherEnabled !== "undefined" ?? false;

        this.render();
    };
}

export default class FancyImage {
    $targets = null;
    instances = [];

    constructor() {
        this.app = new App();
        this.$targets = this.app.core.dom.fancyImage;
    }

    resize = () => {
        if (this.instances.length <= 0) return;
        this.instances.forEach((instance) => {
            instance.resize();
        });
    };

    init = () => {
        if (this.$targets.length > 0) {
            this.instances = Array.from(this.$targets).map(
                (target) => new _FancyImage(target),
            );
        }
    };
}
