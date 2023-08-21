import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";
import { GLB_ASSET_URLS } from "../util/constants";
import { gsap } from "gsap";

THREE.ColorManagement.enabled = false;

/**
 * Globals
 */
const gui = new GUI();
let debug = false;
// DOM cache
let rootEl = null;
let confirmButtonEl = null;
let frameEl = null;
// THREE Cache
let renderer = null;
let canvas = null;
let scene = null;
let camera = null;
let controls = null;
let previousTime = 0;
let rootMeshGroup = null;
let rootMeshGroupBox = null;
let rootMeshGroupSize = null;
const sceneMargin = 2;
const sizes = {
    width: 0,
    height: 0,
    aspectRatio: 0,
};
// Observers
let resizeObserver = null;

/**
 * Updaters
 */
/**
 * @description scales the root group to fit the camera bounds
 */
const updateRootGroupScale = () => {
    if (camera && rootMeshGroup && rootMeshGroupSize) {
        const cameraWidth = camera.right - camera.left;
        const cameraHeight = camera.top - camera.bottom;
        let scale = null;

        if (
            cameraWidth < rootMeshGroupSize.x ||
            cameraHeight < rootMeshGroupSize.z
        ) {
            // scale down
            scale = Math.min(
                cameraWidth / (rootMeshGroupSize.x + sceneMargin),
                cameraHeight / (rootMeshGroupSize.z + sceneMargin)
            );
        } else {
            // scale up
            scale = Math.min(
                (rootMeshGroupSize.x + sceneMargin) / cameraWidth,
                (rootMeshGroupSize.z + sceneMargin) / cameraHeight
            );
        }
        rootMeshGroup.scale.set(scale, scale, scale);
    }
};

const updateCamera = () => {
    if (camera) {
        camera.left = -sizes.aspectRatio;
        camera.right = sizes.aspectRatio;
        camera.top = 1;
        camera.bottom = -1;

        camera.updateProjectionMatrix();
    }
};

const updateSizes = () => {
    if (frameEl) {
        const rect = frameEl.getBoundingClientRect();
        const { width, height } = rect;
        sizes.width = width;
        sizes.height = height;
        sizes.aspectRatio = width / height;
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
    updateCamera();

    // Update rootMeshGroup scale
    updateRootGroupScale();

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
const setup = async () => {
    // Scene
    scene = new THREE.Scene();

    if (debug) {
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
    }

    /**
     * Camera
     */
    // base camera
    // camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio, 0.1, 100);
    camera = new THREE.OrthographicCamera(
        -sizes.aspectRatio,
        sizes.aspectRatio,
        1,
        -1,
        0.1,
        10
    );
    camera.position.set(1, 0, 1);
    scene.add(camera);

    /**
     * Models
     */
    const gltfLoader = new GLTFLoader();

    const rootGltf = await gltfLoader.loadAsync(GLB_ASSET_URLS.Locations);
    rootMeshGroup = rootGltf.scene;
    rootMeshGroupBox = new THREE.Box3().setFromObject(rootMeshGroup);
    rootMeshGroupSize = rootMeshGroupBox.getSize(new THREE.Vector3());
    rootMeshGroup.name = "rootMeshGroup";
    rootMeshGroup.position.set(0, 0, 0);
    rootMeshGroup.renderOrder = 2;
    scene.add(rootMeshGroup);
    updateRootGroupScale();

    /**
     * Controls
     */
    if (debug) {
        controls = new OrbitControls(camera, canvas);
        controls.target.set(
            rootMeshGroup.position.x,
            rootMeshGroup.position.y,
            rootMeshGroup.position.z
        );
        controls.enableDamping = true;
    }

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas,
    });
    renderer.antialias = true;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    if (!debug) {
        renderer.setClearAlpha(0);
    }
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
        if (controls) {
            controls.update();
        } else {
            camera.lookAt(rootMeshGroup.position);
        }

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    // Start tick loop
    tick();

    // Intro animation
    const tl = gsap.timeline({ paused: true });
    tl.to(
        rootMeshGroup.rotation,
        {
            duration: 2,
            ease: "power2.inOut",
            x: Math.PI * 0.5,
            y: 0,
            z: 0,
        },
        0
    );
    tl.to(
        camera.position,
        {
            duration: 2,
            ease: "power2.inOut",
            x: 0,
            y: 0,
            z: 1,
        },
        0
    );
    tl.play();
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
    frameEl = rootEl.querySelector(".js-home-scene");
    canvas = rootEl.querySelector("canvas.js-home-scene__canvas");
    confirmButtonEl = rootEl.querySelector(
        "button.js-home-scene__confirm-button"
    );

    // run relevant updaters
    updateSizes();
};

/**
 * Init
 */
const init = () => {
    rootEl = document.querySelector(".js-home-scene-target");
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

    console.log("module: homeScene: init");
};

export default {
    init,
};
