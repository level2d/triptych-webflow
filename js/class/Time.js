import EventEmitter from "events";

export default class Time extends EventEmitter {
    start = Date.now() * 0.001; // Store value in seconds
    current = Date.now() * 0.001; // Store value in seconds
    elapsed = 0;
    previous = 0;
    delta = 0;
    constructor() {
        super();

        // Start loop in request animation to get positive value for delta
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick() {
        const currentTime = Date.now() * 0.001; // Store value in seconds
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        // emit
        this.emit("tick");

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
}
