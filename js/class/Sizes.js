import EventEmitter from "events";
import { debounce } from "lodash";
export default class Sizes extends EventEmitter {
    // cache
    resizeObserver = null;
    targetNode = null;
    width = 0;
    height = 0;
    aspectRatio = 0;
    pixelRatio = 2;

    constructor(targetNode) {
        super();

        this.targetNode = targetNode ?? document.body;

        // set initial values
        this.updateSizes();

        // bind
        this.handleResize = this.handleResize.bind(this);
        this.handleWindowResizeEnd = debounce(
            this.handleWindowResizeEnd.bind(this),
            100,
        );
        this.init();
    }

    updateSizes() {
        const rect = this.targetNode.getBoundingClientRect();
        const { width, height } = rect;
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    }

    handleResize() {
        this.updateSizes();
        this.emit("resize");
    }

    handleWindowResizeEnd() {
        console.log("resize end");
        this.emit("window resize end");
    }

    bindEvents() {
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(this.targetNode);
        window.addEventListener("resize", this.handleWindowResizeEnd);
    }

    unbindEvents() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    init() {
        this.bindEvents();
    }

    destroy() {
        this.unbindEvents();
    }
}
