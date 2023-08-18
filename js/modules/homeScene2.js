import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";
import * as dat from "lil-gui";
import { debounce } from "lodash";
import { GLB_ASSET_URLS } from "../util/constants";

// Debug
const gui = new dat.GUI();
let debug = true;
let stats = null;
let rootEl = null;
let confirmButtonEl = null;
let frameEl = null;
let scene = null;
let canvas = null;
let textureLoader = null;
let glTFLoader = null;
let controls = null;
let camera = null;
let renderer = null;
let clock = null;
let resizeObserver = null;
const cameraValues = {
    frustumSize: 50,
    near: 0.1,
    far: 200,
};
const sizes = {
    width: 0,
    height: 0,
};

/**
 * 3D Setup
 */
const setup = () => {
    // Scene
    scene = new THREE.Scene();

    /**
     * Textures
     */
    textureLoader = new THREE.TextureLoader();

    /**
     * Gltfs
     */
    glTFLoader = new GLTFLoader();
    const locationsModel = glTFLoader.load(GLB_ASSET_URLS.Locations, (gltf) => {
        scene.add(gltf.scene);
        const sceneGroup = scene.getObjectByName("Scene");
        sceneGroup.rotation.x = Math.PI * 0.5;
        // setTimeout(() => {
        //     gsap.to(sceneGroup.rotation, {
        //         x: Math.PI * 0.5,
        //         z: -Math.PI * 0.5,
        //         duration: 1,
        //     });
        // }, 500);
    });

    /**
     * Camera
     */
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    scene.add(box);
    // Base camera
    camera = new THREE.OrthographicCamera(
        (cameraValues.frustumSize * (sizes.width / sizes.height)) / -2,
        (cameraValues.frustumSize * (sizes.width / sizes.height)) / 2,
        cameraValues.frustumSize / 2,
        cameraValues.frustumSize / -2,
        0.1,
        200
    );
    camera.position.set(0, 0, 80);
    const cameraGui = gui.addFolder("Camera");
    cameraGui
        .add(cameraValues, "frustumSize")
        .min(0)
        .max(100)
        .step(1)
        .onChange((frustumSize) => {
            cameraValues.frustumSize = frustumSize;
            updateCamera();
        });
    cameraGui
        .add(cameraValues, "near")
        .min(0)
        .max(10)
        .step(0.1)
        .onChange((near) => {
            cameraValues.near = near;
            updateCamera();
        });
    cameraGui
        .add(cameraValues, "far")
        .min(100)
        .max(300)
        .step(1)
        .onChange((far) => {
            cameraValues.far = far;
            updateCamera();
        });
    scene.add(camera);

    // Controls
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // update stats
        if (stats) {
            stats.update();
        }

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
};

// Sizes updater
const updateSizes = () => {
    const rect = frameEl.getBoundingClientRect();
    sizes.width = rect.width;
    sizes.height = rect.height;
};

// Camera updater
const updateCamera = () => {
    const aspect = sizes.width / sizes.height;

    camera.left = (-cameraValues.frustumSize * aspect) / 2;
    camera.right = (cameraValues.frustumSize * aspect) / 2;
    camera.top = cameraValues.frustumSize / 2;
    camera.bottom = -cameraValues.frustumSize / 2;

    camera.updateProjectionMatrix();
};

/**
 * Events and Observables
 */
const handleDeviceOrientation = () => {};
const debouncedHandleDeviceOrientation = debounce(handleDeviceOrientation, 3);
const bindOrientationHandler = () => {
    window.addEventListener(
        "deviceorientation",
        debouncedHandleDeviceOrientation
    );
};
const handleConfirmClick = (e) => {
    const { target } = e;
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === "granted") {
                    bindOrientationHandler();
                    target.remove();
                } else {
                    console.error(
                        "Request to access the orientation was rejected"
                    );
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        bindOrientationHandler();
        target.remove();
    }
};

const handleResize = () => {
    const rect = canvas.getBoundingClientRect();

    // Update sizes
    updateSizes();

    // Update camera
    updateCamera();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(rect.devicePixelRatio, 2));
};

const bindEventListeners = () => {
    if (confirmButtonEl) {
        confirmButtonEl.addEventListener("click", handleConfirmClick);
    }
};

const bindObservables = () => {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(frameEl);
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
                <div class="home-scene__bg"></div>
            </div>
        </div>
    `;
};

const init = () => {
    rootEl = document.querySelector(".js-home-scene-target-2");
    if (!rootEl) {
        return;
    }

    render();
    debug = new URLSearchParams(window.location.search).get("debug");
    frameEl = rootEl.querySelector(".js-home-scene");
    canvas = rootEl.querySelector(".js-home-scene__canvas");
    confirmButtonEl = rootEl.querySelector(".js-home-scene__confirm-button");

    bindEventListeners();
    bindObservables();
    updateSizes();
    setup();
    handleResize();

    if (debug) {
        stats = new Stats();
        rootEl.appendChild(stats.dom);
    } else {
        gui.destroy();
    }
    console.log("module: homeScene: init");
};

export default {
    init,
};
