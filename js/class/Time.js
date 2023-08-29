import EventEmitter from "events";

export default class Time extends EventEmitter {
    elapsed = 0;
    delta = 0;
    constructor() {
        super();

        this.tick = this.tick.bind(this);
        // Start loop in request animation to get positive value for delta
        requestAnimationFrame(this.tick);
    }

    tick(timestamp) {
        const elapsed = timestamp * 0.001; // Store value in seconds
        this.delta = elapsed - this.elapsed;
        this.elapsed = elapsed;

        // emit
        this.emit("tick");

        window.requestAnimationFrame(this.tick);
    }
}
