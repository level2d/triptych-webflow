import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Globals
 */
const gui = new GUI();
let debug = false;
let rootEl = null;
let frameEl = null;
let renderer = null;
let canvas = null;
let scene = null;
let camera = null;
let controls = null;
let previousTime = 0;
let sizes = {
    width: 0,
    height: 0,
};
let resizeObserver = null;

/**
 * Updaters
 */
const updateControls = () => {
    if (controls) {
        controls.update();
    }
};
const updateSizes = () => {
    if (frameEl) {
        const rect = frameEl.getBoundingClientRect();

        sizes.width = rect.width;
        sizes.height = rect.height;

        console.log(sizes);
    }
};

const updateRenderer = () => {
    if (renderer) {
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
};

/**
 * Event/Observer Handlers
 */
const handleResize = () => {
    // Update sizes
    updateSizes();

    // Update camera
    if (camera) {
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
    }

    // Update renderer
    updateRenderer();
};

const bindObservers = () => {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(frameEl);
};

/**
 * Setup
 */
const setup = () => {
    // Scene
    scene = new THREE.Scene();

    /**
     * Floor
     */
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial()
    );
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.3);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /**
     * Camera
     */
    // base camera
    camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
    );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;
    scene.add(camera);

    /**
     * Controls
     */
    if (debug) {
        controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;
    }

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    updateRenderer();

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        // Update controls
        updateControls();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
};

/**
 * Render
 */
const render = () => {
    rootEl.innerHTML = `
        <div class="js-home-scene home-scene">
            <div class="home-scene__inner">
                <canvas class="js-home-scene__canvas home-scene__canvas"></canvas>
                <button class="js-home-scene__confirm-button home-scene__confirm-button"></button>
            </div>
        </div>
    `;

    // update DOM cache
    canvas = rootEl.querySelector("canvas.js-home-scene__canvas");
    frameEl = rootEl.querySelector(".js-home-scene");

    // run relevant updaters
    updateSizes();
};

/**
 * Init
 */
const init = () => {
    console.log("Module: Home Scene: init");
    rootEl = document.querySelector(".js-home-scene-target-2");
    if (!rootEl) {
        return;
    }

    debug = new URLSearchParams(window.location.search).get("debug");

    render();
    setup();
    bindObservers();

    if (!debug) {
        gui.destroy();
    }
};

export default {
    init,
};
