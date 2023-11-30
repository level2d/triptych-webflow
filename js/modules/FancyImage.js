import {
    canvas2d,
    GRAY8,
    intBufferFromImage,
    imageFromURL,
} from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";
import * as intrinsicScale from "intrinsic-scale";
import gsap, { ScrollTrigger } from "@/js/lib/gsap";

import App from "@/js/App";

class _FancyImage {
    app = null;
    // settings
    src = null;
    ditherEnabled = false;
    pixelAnimationEnabled = false;
    objectFit = "contain";
    // DOM Elements
    DOM = {
        el: null,
        parentEl: null,
        container: null,
        inner: null,
        img: null, // canvas image
        canvas: null,
    };
    // props
    scaleFunc = null;
    scaled = {}; // holds scaled positioning values
    imgRatio = null; // the image's aspect ratio
    ctx = null; // canvas context
    backCanvas = null; // backup canvas (not appended to DOM)
    backCtx = null; // backup canvas context
    finalCanvas = null; // final canvas (not appended to DOM)
    finalCtx = null; // final canvas context
    // The pixelation factor values determine the level of
    // pixelation at each step of the effect.
    // To make the effect more prominent, we start with
    // smaller values initially to keep the big blocks
    // visible for a longer time.
    // Towards the end we don't add many values as
    // we want the sharpening up to happen quickly here.
    pxFactorValues = [1, 2, 4, 9, 100];
    pxIndex = 0;
    scrollTrigger = null;

    constructor(node) {
        this.init(node);
    }

    resize = () => {
        this.setScaled();
        this.setMediaSizes();
        this.renderFinalImg();
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
        ctx.fillStyle = this.app.core.colors.black;

        this.DOM.canvas = canvas;
        this.DOM.inner.appendChild(this.DOM.canvas);
        this.ctx = ctx;
    };

    setBackCanvas = () => {
        // Create backup canvas
        const { canvas, ctx } = canvas2d(this.scaled.width, this.scaled.height);
        ctx.fillStyle = this.app.core.colors.black;
        this.backCanvas = canvas;
        this.backCtx = ctx;
    };

    setFinalCanvas = () => {
        // Create final canvas
        const { canvas, ctx } = canvas2d(this.scaled.width, this.scaled.height);
        ctx.fillStyle = this.app.core.colors.black;
        this.finalCanvas = canvas;
        this.finalCtx = ctx;
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
        this.finalCanvas.width = this.scaled.width;
        this.finalCanvas.height = this.scaled.height;
        this.finalCanvas.style.width = `${this.scaled.width}px`;
        this.finalCanvas.style.height = `${this.scaled.height}px`;
        this.finalCanvas.style.top = `${this.scaled.y}px`;
        this.finalCanvas.style.left = `${this.scaled.x}px`;
    };

    renderFinalImg = async () => {
        // Draw the initial image to the canvas
        this.ctx.drawImage(
            this.DOM.img,
            0,
            0,
            this.scaled.width,
            this.scaled.height,
        );

        // Dither the image
        if (this.ditherEnabled) {
            // Create image buf to render into canvas
            const buf = intBufferFromImage(
                this.DOM.img,
                GRAY8,
                this.scaled.width,
                this.scaled.height,
            );
            // draw a dithered image to the canvas
            ditherWith(ATKINSON, buf).blitCanvas(this.DOM.canvas);
            // Apply lighten blend mode to the canvas
            this.ctx.globalCompositeOperation = "lighten";
            this.ctx.fillStyle = this.app.core.colors.black;
            this.ctx.fillRect(0, 0, this.scaled.width, this.scaled.height);
            // reset this back to normal to not affect the pixelation
            this.ctx.globalCompositeOperation = "normal";
        }

        // Draw final render to a backup canvas
        this.finalCtx.drawImage(this.DOM.canvas, 0, 0);
    };

    renderPixelFrame = () => {
        const offsetWidth = this.scaled.width;
        const offsetHeight = this.scaled.height;
        // increase a bit to not have a gap in the end of the image
        // when we have big pizel sizes
        const w = offsetWidth;
        const h = offsetHeight;

        // Calculate the dimensions and position for rendering the image
        // within the canvas based on the image aspect ratio.
        let newWidth = w;
        let newHeight = h;
        let newX = 0;
        let newY = 0;

        // Adjust the dimensions and position if the image
        // aspect ratio is different from the canvas aspect ratio
        if (newWidth / newHeight > this.imgRatio) {
            newHeight = Math.round(w / this.imgRatio);
            // let's keep Y at 0 because we want the pixels to not
            // be cut off at the top. Uncomment if you want the
            // image to be centered.
            // newY = (h - newHeight) / 2;
        } else {
            newWidth = Math.round(h * this.imgRatio);
            newX = (w - newWidth) / 2;
        }

        // Get the pixel factor based on the current index
        let pxFactor = this.pxFactorValues[this.pxIndex];
        const size = pxFactor * 0.01;

        // Turn off image smoothing to achieve the pixelated effect
        this.ctx.mozImageSmoothingEnabled = size === 1 ? true : false;
        this.ctx.webkitImageSmoothingEnabled = size === 1 ? true : false;
        this.ctx.imageSmoothingEnabled = size === 1 ? true : false;

        // Clear the canvas and fill with white
        this.ctx.clearRect(0, 0, this.scaled.width, this.scaled.height);
        // this.ctx.fillStyle = "white"; // uncomment if you want a white background
        this.ctx.fillRect(0, 0, this.scaled.width, this.scaled.height);

        // Draw the final image at a fraction of the final size
        // draw to backing canvas
        this.backCanvas.width = this.DOM.canvas.width;
        this.backCanvas.height = this.DOM.canvas.height;
        this.backCtx.drawImage(this.finalCanvas, 0, 0, w * size, h * size);

        // Enlarge the minimized image to full size
        this.ctx.drawImage(
            this.backCanvas,
            0,
            0,
            w * size,
            h * size,
            newX,
            newY,
            newWidth,
            newHeight,
        );
    };

    /**
     * Animates the pixelation effect.
     * Renders the image with increasing pixelation factor at each step.
     */
    animatePixels = () => {
        if (this.pxIndex < this.pxFactorValues.length) {
            // Increase the pixelation factor and continue animating
            setTimeout(
                () => {
                    // Render the image with the current pixelation factor
                    this.renderPixelFrame();
                    this.pxIndex++;
                    this.animatePixels();
                },
                this.pxIndex === 0 ? 100 : 80,
            ); // The first time should be the longest.
        } else {
            // Draw that final image
            this.ctx.drawImage(
                this.finalCanvas,
                0,
                0,
                this.scaled.width,
                this.scaled.height,
            );
            this.DOM.container.classList.add("fancy-image--animate-end");
            this.DOM.container.classList.remove("fancy-image--animate-start");
            this.pxIndex = this.pxFactorValues.length - 1;
        }
    };

    showImage = () => {
        // Play pixel animation if applicable
        if (this.pixelAnimationEnabled) {
            // Render first pixelated frame
            this.renderPixelFrame();

            this.DOM.container.addEventListener(
                "transitionend",
                () => {
                    this.DOM.container.classList.add(
                        "fancy-image--animate-start",
                    );
                    this.animatePixels();
                },
                { once: true },
            );
        }
        // add class to fade in image
        this.DOM.container.classList.add("fancy-image--ready");
    };

    initScrollTrigger = () => {
        this.scrollTrigger = ScrollTrigger.create({
            trigger: this.DOM.el,
            start: "top+=30% bottom-=30%",
            onEnter: () => {
                this.showImage();
            },
            once: true,
        });
    };

    init = async (node) => {
        // root el
        this.DOM.el = node;
        this.app = new App();

        // settings from root el
        this.src = this.DOM.el.src;
        this.objectFit = this.DOM.el.dataset.objectFit ?? "contain"; // object fit mode
        this.ditherEnabled =
            typeof this.DOM.el.dataset.ditherEnabled !== "undefined" ?? false;
        this.pixelAnimationEnabled =
            typeof this.DOM.el.dataset.pixelAnimationEnabled !== "undefined" ??
            false;
        this.scaleFunc = intrinsicScale[this.objectFit];

        // Load Image
        // I'm ashamed of this, but this was the only way to help with images not loading...
        let keepTrying;
        let tryCount = 1;
        let maxTries = 5;
        let imageLoaded = false;
        do {
            try {
                this.DOM.img = await imageFromURL(this.src);
                keepTrying = false;
                imageLoaded = true;
            } catch {
                if (tryCount >= maxTries) {
                    console.warn(
                        `Module: FancyImage: image url ${this.src} failed to load ${tryCount} times. Giving up.`,
                    );
                    keepTrying = false;
                } else {
                    console.warn(
                        `Module: FancyImage: image url ${this.src} failed to load ${tryCount} times. Trying again.`,
                    );
                    keepTrying = true;
                    tryCount++;
                }
            }
        } while (keepTrying);

        if (!imageLoaded) {
            this.el.style.visibility = "visible";
            return; // short circuit and just show the original image
        }

        // DOM
        this.DOM.parentEl = this.DOM.el.parentElement;
        this.DOM.parentEl.dataset.fancyImageParent = ""; // add parent positioning attribute

        this.DOM.container = document.createElement("div");
        this.DOM.container.classList.add("fancy-image");
        this.DOM.parentEl.appendChild(this.DOM.container); // app as next sibling of source node

        this.DOM.inner = document.createElement("div");
        this.DOM.inner.classList.add("fancy-image__inner");
        this.DOM.container.appendChild(this.DOM.inner);

        this.DOM.img.classList.add("fancy-image__img");
        this.DOM.inner.appendChild(this.DOM.img);
        this.imgRatio = this.DOM.img.naturalWidth / this.DOM.img.naturalHeight;

        this.setScaled();
        this.setCanvas();
        this.setBackCanvas();
        this.setFinalCanvas();
        this.setMediaSizes();
        this.renderFinalImg();

        this.initScrollTrigger();
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
        this.app.bus.on("App: loaded", () => {
            setTimeout(() => {
                if (this.$targets.length > 0) {
                    this.instances = Array.from(this.$targets).map(
                        (target) => new _FancyImage(target),
                    );
                    console.log("Module: FancyImage: init");
                }
            }, 250);
        });
    };
}
