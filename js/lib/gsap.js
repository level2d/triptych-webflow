import { gsap } from "gsap";

// Disconnect gsap from it's internal raf loop.
// We will update it within our custom raf loop in main.js
gsap.ticker.remove(gsap.updateRoot);

export default gsap;
