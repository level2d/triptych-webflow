import {
    canvas2d,
    GRAY8,
    intBufferFromImage,
    imagePromise,
} from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";
import * as intrinsicScale from "intrinsic-scale";

import App from "@/js/App";

export default class DitheredImage {
    $target = null;
    targets = [];
    renderedTargets = [];

    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.ditheredImage;
        this.targets = Array.from(this.$target);
    }

    resizeEnd = () => {
        if (this.renderedTargets.length <= 0) return;
        this.renderedTargets.forEach((node) => {
            const inner = node.querySelector(".inner");
            node.classList.remove("ready");
            setTimeout(() => {
                node.removeChild(inner);
                this.renderImage(node);
            }, 200);
        });
    };

    renderImage = async (node) => {
        const objectFit = node.dataset.objectFit ?? "cover";

        const inner = document.createElement("div");
        inner.classList.add("inner");
        node.appendChild(inner);
        const { width, height } = inner.getBoundingClientRect();

        const img = await imagePromise(node.dataset.imageSrc);

        const scaled = intrinsicScale[objectFit](
            width,
            height,
            img.naturalWidth,
            img.naturalHeight,
        );

        const buf = intBufferFromImage(img, GRAY8, scaled.width, scaled.height);

        const { canvas, ctx } = canvas2d(buf.width, buf.height);
        ctx.fillStyle = "white";

        ditherWith(ATKINSON, buf).blitCanvas(canvas);

        img.style.width = `${scaled.width}px`;
        img.style.height = `${scaled.height}px`;
        img.style.top = `${scaled.y}px`;
        img.style.left = `${scaled.x}px`;
        canvas.style.width = `${scaled.width}px`;
        canvas.style.height = `${scaled.height}px`;
        canvas.style.top = `${scaled.y}px`;
        canvas.style.left = `${scaled.x}px`;
        inner.appendChild(img);
        inner.appendChild(canvas);
        node.classList.add("ready");

        this.renderedTargets.push(node);
    };

    init = () => {
        if (this.targets.length) {
            this.targets.forEach(this.renderImage);
        }
    };
}
