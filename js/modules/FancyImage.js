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
        inner: null,
        img: null, // canvas image
        canvas: null,
    };
    // settings
    src = null;
    ditherEnabled = false;
    objectFit = "contain";
    // inferred from settings
    scaleFunc = null;
    // props
    scaled = {}; // holds scaled positioning values
    ctx = null; // canvas context

    constructor(node) {
        this.init(node);
    }

    resize = () => {
        this.setScaled();
        this.setMediaSizes();
        this.drawImage();
    };

    setScaled = () => {
        // Detect image window size
        const { width, height } = this.DOM.el.getBoundingClientRect();

        // Calculate img and canvas sizing based on object fit mode
        this.scaled = this.scaleFunc(
            width,
            height,
            this.DOM.img.naturalWidth,
            this.DOM.img.naturalHeight,
        );
    };

    setCanvas = () => {
        // Create canvas
        const { canvas, ctx } = canvas2d(this.scaled.width, this.scaled.height);
        canvas.classList.add("fancy-image__canvas");
        ctx.fillStyle = "white";

        this.DOM.canvas = canvas;
        this.DOM.inner.appendChild(this.DOM.canvas);
        this.ctx = ctx;
    };

    setMediaSizes = async () => {
        // Apply object fit styles
        this.DOM.img.style.width = `${this.scaled.width}px`;
        this.DOM.img.style.height = `${this.scaled.height}px`;
        this.DOM.img.style.top = `${this.scaled.y}px`;
        this.DOM.img.style.left = `${this.scaled.x}px`;
        this.DOM.canvas.width = this.scaled.width;
        this.DOM.canvas.height = this.scaled.height;
        this.DOM.canvas.style.width = `${this.scaled.width}px`;
        this.DOM.canvas.style.height = `${this.scaled.height}px`;
        this.DOM.canvas.style.top = `${this.scaled.y}px`;
        this.DOM.canvas.style.left = `${this.scaled.x}px`;

        this.DOM.container.classList.add("fancy-image--ready");
    };

    drawImage = () => {
        // Dither the image
        if (this.ditherEnabled) {
            // Create image buf to render into canvas
            const buf = intBufferFromImage(
                this.DOM.img,
                GRAY8,
                this.scaled.width,
                this.scaled.height,
            );
            ditherWith(ATKINSON, buf).blitCanvas(this.DOM.canvas);
        }
    };

    init = async (node) => {
        // root el
        this.DOM.el = node;

        // settings from root el
        this.src = this.DOM.el.src;
        this.objectFit = this.DOM.el.dataset.objectFit ?? "contain"; // object fit mode
        this.ditherEnabled =
            typeof this.DOM.el.dataset.ditherEnabled !== "undefined" ?? false;
        this.scaleFunc = intrinsicScale[this.objectFit];

        // DOM
        this.DOM.parentEl = this.DOM.el.parentElement;
        this.DOM.parentEl.dataset.fancyImageParent = ""; // add parent positioning attribute

        this.DOM.container = document.createElement("div");
        this.DOM.container.classList.add("fancy-image");
        this.DOM.parentEl.appendChild(this.DOM.container); // app as next sibling of source node

        this.DOM.inner = document.createElement("div");
        this.DOM.inner.classList.add("fancy-image__inner");
        this.DOM.container.appendChild(this.DOM.inner);

        this.DOM.img = await imagePromise(this.src);
        this.DOM.img.classList.add("fancy-image__img");
        this.DOM.inner.appendChild(this.DOM.img);

        this.setScaled();
        this.setCanvas();

        this.setMediaSizes();
        this.drawImage();
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
