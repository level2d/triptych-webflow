import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    orientation: "vertical",
    gestureOrientation: "vertical",
});

export default lenis;
