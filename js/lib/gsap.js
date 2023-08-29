import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import lenis from "./lenis";

// Disconnect gsap from it's internal raf loop.
// We will update it within our custom raf loop in main.js
gsap.ticker.remove(gsap.updateRoot);
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", ScrollTrigger.update); // Update scroll trigger on lenis scroll

export default gsap;
