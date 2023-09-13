import {
    canvas2d,
    GRAY8,
    intBufferFromImage,
    imagePromise,
} from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";
import * as intrinsicScale from "intrinsic-scale";

import App from "@/js/App";

export default class FancyImage {
    $targets = null;

    constructor() {
        this.app = new App();
        this.$targets = this.app.core.dom.fancyImage;
    }

    resizeEnd = () => {
        if (this.$targets.next(".fancy-image").length <= 0) return;
        this.$targets.next(".fancy-image").remove();
        this.$targets.each((i) => this.renderImage(this.$targets[i]));
    };

    renderImage = async (node) => {
        const parentNode = node.parentNode;
        parentNode.dataset.moduleFancyImageParent = ""; // add parent positioning

        // Detect object fit mode
        const objectFit = node.dataset.objectFit ?? "contain";

        // Create container that everything lives inside
        const container = document.createElement("div");
        container.classList.add("fancy-image");

        // Append as next sibling of source node
        if (node.nextSibling) {
            parentNode.insertBefore(container, node.nextSibling);
        } else {
            parentNode.appendChild(container);
        }

        // Create inner
        const inner = document.createElement("div");
        inner.classList.add("fancy-image__inner");
        container.appendChild(inner);

        // Detect image window size
        const { width, height } = node.getBoundingClientRect();

        // Load new image
        const img = await imagePromise(node.src);
        img.classList.add("fancy-image__img");

        // Calculate img and canvas sizing based on object fit mode
        const scaled = intrinsicScale[objectFit](
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
        ditherWith(ATKINSON, buf).blitCanvas(canvas);

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
        container.classList.add("fancy-image--ready");
    };

    init = () => {
        if (this.$targets.length > 0) {
            this.$targets.each((i) => {
                this.renderImage(this.$targets[i]);
            });
        }
    };
}
