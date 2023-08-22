import EventEmitter from "events";

export default class Sizes extends EventEmitter {
    // cache
    resizeObserver = null;
    observableNode = null;
    width = 0;
    height = 0;
    aspectRatio = 0;
    pixelRatio = 2;

    constructor(observableNode) {
        super();

        this.observableNode = observableNode ?? document.body;

        // set initial values
        this.updateSizes();

        // bind
        this.handleResize = this.handleResize.bind(this);
        this.init();
    }

    updateSizes() {
        const rect = this.observableNode.getBoundingClientRect();
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

    bindEvents() {
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(this.observableNode);
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
