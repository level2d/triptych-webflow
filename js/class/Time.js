import EventEmitter from "events";

export default class Time extends EventEmitter {
    elapsed = 0;
    delta = 0;
    constructor() {
        super();
        // Start loop in request animation to get positive value for delta
        requestAnimationFrame(this.tick.bind(this));
    }

    tick(timestamp) {
        const elapsed = timestamp * 0.001; // Store value in seconds
        const MAX_DELTA = 0.1; // 100ms cap
        this.delta = Math.min(elapsed - this.elapsed, MAX_DELTA);
        this.elapsed = elapsed;

        // Throttle updates
        if (this.delta >= 1 / 60) {
            // Target 60fps
            this.emit("tick", this.delta, this.elapsed);
        }

        requestAnimationFrame(this.tick.bind(this));
    }
}
