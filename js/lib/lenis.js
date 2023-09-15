import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // easing: (t) => 1 - Math.pow(1 - t, 5), // easeOutQuint <<<<<<<<<<<<<<<<<<
    // easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // easeOutExpo
    // easing: (t) => 1 - --t * t * t * t, // easeOutQuart
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    orientation: "vertical",
    gestureOrientation: "vertical",
});

export default lenis;
