import { canvas2d, GRAY8, intBufferFromImage } from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";

import App from "@/js/App";

export default class DitheredImage {
    $target = null;

    constructor() {
        this.app = new App();
        this.$target = this.app.core.dom.ditheredImage;
    }

    processImage = (buf /*: IntBuffer*/, root /*: HTMLElement */) => {
        const { canvas } = canvas2d(buf.width, buf.height, root);
        const dithered = ditherWith(ATKINSON, buf.copy().as(GRAY8), {});
        dithered.blitCanvas(canvas);
    };

    init = () => {
        if (this.$target.length) {
            console.log(this.$target);
            this.$target.each((index, node) => {
                const img = node.querySelector("img");
                // dither image and convert to indexed color using given palette
                const buf = intBufferFromImage(img);
                this.processImage(buf, node);
            });
        }
    };
}
