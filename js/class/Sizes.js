import EventEmitter from "events";

export default class Sizes extends EventEmitter {
    constructor(observableNode) {
        super();

        this.resizeObserver = null;
        this.observableNode = observableNode ?? document.body;

        // cache
        this.width = 0;
        this.height = 0;
        this.aspectRatio = 0;

        this.init();
    }

    handleResize() {
        const rect = this.observableNode.getBoundingClientRect();
        const { width, height } = rect;
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;

        this.emit("resize");
    }

    bindEvents() {
        this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
        this.resizeObserver.observe(this.observableNode);
    }

    init() {
        this.bindEvents();
    }
}
