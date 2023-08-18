import {
    Engine,
    Scene,
    AxesViewer,
    ArcRotateCamera,
    Camera,
    Color4,
    HemisphericLight,
    SceneLoader,
    NodeMaterial,
    Vector3,
    ActionManager,
    ExecuteCodeAction,
    VideoTexture,
    StandardMaterial,
    Texture,
} from "@babylonjs/core/";
import { Inspector } from "@babylonjs/inspector";

// Enable GLTF/GLB loader (side-effects)
import "@babylonjs/loaders/glTF";

import { zeroPad, loadTexturesAsync } from "@/js/util/helpers";
import {
    BOX_MESHES,
    BOX_NAMES,
    GLB_ASSET_URLS,
    TEXTURE_ASSET_URLS,
    SHADER_ASSET_URLS,
    ANIMATION_NAMES,
    AUTOPLAY_ANIMATION_CONFIGS,
} from "@/js/util/constants";
import { debounce } from "lodash";
import gsap from "gsap";

let debug = false;
let rootEl = null;
let confirmButtonEl = null;
let resizeObserver = null;
let engine = null;
let scene = null;
let canvas = null;
let camera = null;
let fpsEl = null;
let isPanEnabled = false;
let offsetXEl = null;
let offsetYEl = null;
let panX = 0;
let panY = 0;
const minPan = -0.68;
const maxPan = 0.68;

const Y = {
    UP: "UP",
    DOWN: "DOWN",
};
const X = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

// calc direction
const getMousePanDirections = ({ width, height, offsetX, offsetY }) => {
    let x = width / 2 > offsetX ? X.RIGHT : X.LEFT;
    let y = height / 2 > offsetY ? Y.DOWN : Y.UP;
    return [x, y];
};

const getGyroPanDirections = ({ beta, gamma }) => {
    let x = gamma > 0 ? X.RIGHT : X.LEFT;
    let y = beta > 45 ? Y.DOWN : Y.UP;
    return [x, y];
};

const handleResize = (entries) => {
    if (engine) {
        engine.resize();
    }
    updateCameraFovMode();
};

const handleDeviceOrientation = (e) => {
    const { beta, gamma } = e;
    const rect = canvas.getBoundingClientRect();
    const { width, height } = rect;
    const [xPanDir, yPanDir] = getGyroPanDirections({
        beta,
        gamma,
    });

    const xFactor = (gamma * (width / 2)) / 180 / (width / 2);
    const yFactor = ((beta + 45) * (height / 2)) / 90 / (height / 2);

    panX =
        xPanDir === "LEFT"
            ? Math.max(xFactor, minPan)
            : Math.min(xFactor, maxPan);

    panY =
        yPanDir === "UP"
            ? Math.max(yFactor, minPan)
            : Math.min(yFactor, maxPan);
};

const debouncedHandleDeviceOrientation = debounce(handleDeviceOrientation, 3);

const bindOrientationHandler = () => {
    window.addEventListener(
        "deviceorientation",
        debouncedHandleDeviceOrientation
    );
};

const updateCameraFovMode = () => {
    if (!engine) return;
    if (!camera) return;
    if (engine.getRenderHeight() > engine.getRenderWidth()) {
        camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
    } else {
        camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;
    }
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

const handleMousemove = (e) => {
    const { offsetX, offsetY } = e;
    const rect = canvas.getBoundingClientRect();
    const { width, height } = rect;

    // update ui
    if (debug) {
        offsetXEl.innerHTML = `${offsetX}`;
        offsetYEl.innerHTML = `${offsetY}`;
    }

    const [xPanDir, yPanDir] = getMousePanDirections({
        width,
        height,
        offsetX,
        offsetY,
    });

    const xFactor = (width / 2 - offsetX) / (width / 2);
    const yFactor = (height / 2 - offsetY) / (height / 2);

    panX =
        xPanDir === "LEFT"
            ? Math.max(xFactor, minPan)
            : Math.min(xFactor, maxPan);
    panY =
        yPanDir === "UP"
            ? Math.max(yFactor, minPan)
            : Math.min(yFactor, maxPan);
};

const bindEventListeners = () => {
    canvas.addEventListener("mousemove", handleMousemove);

    // hide/show the Inspector
    if (import.meta.env.MODE === "development") {
        console.log("bound");
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+I
            if (ev.shiftKey && ev.ctrlKey && ev.key === "I") {
                if (scene.debugLayer.isVisible()) {
                    Inspector.Hide();
                } else {
                    Inspector.Show(scene, { embedMode: true });
                }
            }
        });
    }

    if (confirmButtonEl) {
        confirmButtonEl.addEventListener("click", handleConfirmClick);
    }
};

const bindObservables = () => {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
};

const setup = async () => {
    // Associate a Babylon Engine to it.
    engine = new Engine(canvas);

    // Create our first scene.
    scene = new Scene(engine);

    scene.clearColor = new Color4(255, 255, 255, 0);

    // Debuggers
    if (debug) {
        const axes = new AxesViewer(scene, 5);
    }

    /**
     * Textures
     */
    // get the texture
    const matCapTexture = new Texture(TEXTURE_ASSET_URLS.matcap, scene);

    /**
     * Materials
     */
    // matcap shader
    const matCapShader = await NodeMaterial.ParseFromFileAsync(
        "matcap_shader",
        SHADER_ASSET_URLS.matcap,
        scene
    );
    matCapShader.build(false);
    matCapShader.texture = matCapTexture; // assign matcap texture to matcap shader material

    // Tv material
    const tvScreenTexture = new VideoTexture(
        "running_man",
        TEXTURE_ASSET_URLS.running_man,
        scene,
        true,
        true
    );
    const tvScreenMaterial = new StandardMaterial("tv_screen");
    tvScreenMaterial.diffuseTexture = tvScreenTexture;

    /**
     * Models
     */
    // Locations mesh
    const locationsImportResult = await SceneLoader.ImportMeshAsync(
        "",
        GLB_ASSET_URLS.Locations,
        "",
        scene
    );
    const locationsMesh = locationsImportResult.meshes[0];
    locationsMesh.name = "locations";

    // set render order
    locationsMesh.getChildMeshes().forEach((mesh) => {
        mesh.renderingGroupId = 1;
    });

    // load box meshes
    const boxMeshes = await Promise.all(
        Object.keys(BOX_NAMES)
            .map((key) => BOX_NAMES[key])
            .map(async (name) => {
                const url = GLB_ASSET_URLS[name];
                const importResult = await SceneLoader.ImportMeshAsync(
                    "",
                    url,
                    "",
                    scene
                );
                const rootMesh = importResult.meshes[0];
                rootMesh.name = name; // give it a unique name for grabbing it later
                // rootMesh.rotation = new Vector3(0, Math.PI * -0.5, 0); // rotate it correctly
                rootMesh.setEnabled(false); // hide the box
                return rootMesh;
            })
    );

    // configure box meshes
    boxMeshes.forEach((mesh) => {
        const { name } = mesh;
        const childMeshes = mesh.getChildMeshes();
        switch (name) {
            case BOX_NAMES.TV: {
                const screenMesh = childMeshes.find(
                    (mesh) => mesh.name === "screen"
                );
                screenMesh.material = tvScreenMaterial;
                break;
            }
            case BOX_NAMES.GUMBALL: {
                const targetMesh = childMeshes.find(
                    (mesh) => mesh.name === "Sphere"
                );
                targetMesh.renderingGroupId = 2;
            }
            case BOX_NAMES.MUG: {
                const targets = ["hand", "coffee", "mug"];
                const targetMeshes = childMeshes.filter((mesh) =>
                    targets.includes(mesh.name)
                );
                targetMeshes.forEach((mesh) => {
                    let groupId = 0;
                    switch (mesh.name) {
                        case "hand":
                            groupId = 1;
                            break;
                        default:
                            groupId = 2;
                            break;
                    }
                    mesh.renderingGroupId = groupId;
                });
                break;
            }
            default:
                break;
        }
    });

    // Create animation cache
    const anim = {};
    Object.keys(ANIMATION_NAMES).forEach((name) => {
        const animation = scene.getAnimationGroupByName(name);

        switch (name) {
            case ANIMATION_NAMES.switch_01:
            case ANIMATION_NAMES.book_01:
                animation.metadata = {};
                animation.metadata["isPlayed"] = false;
                break;
            default:
                break;
        }

        anim[name] = animation;
    });

    // Start autoplay animations
    AUTOPLAY_ANIMATION_CONFIGS.forEach(({ name, loop }) => {
        const targetAnim = anim[name];
        targetAnim.reset();
        targetAnim.play(loop);
    });

    // setup mesh specific actions
    // switch mesh
    const prepareSwitchMesh = function (mesh) {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
                const animation = anim.switch_01;
                if (animation.metadata.isPlayed) {
                    animation.start(
                        false,
                        animation.speedRatio,
                        animation.to,
                        0
                    );
                } else {
                    animation.play();
                }
                animation.metadata.isPlayed = !animation.metadata.isPlayed;
            })
        );
    };

    const switchMesh = boxMeshes.find((mesh) => mesh.name === BOX_NAMES.SWITCH);
    switchMesh.getChildMeshes().forEach((mesh) => prepareSwitchMesh(mesh));

    // books mesh
    const prepareBooksMesh = function (mesh) {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
                const animation = anim.book_01;
                if (animation.metadata.isPlayed) {
                    animation.start(
                        false,
                        animation.speedRatio,
                        animation.to,
                        0
                    );
                } else {
                    animation.play();
                }
                animation.metadata.isPlayed = !animation.metadata.isPlayed;
            })
        );
    };

    const booksMesh = boxMeshes.find((mesh) => mesh.name === BOX_NAMES.BOOKS);
    booksMesh.getChildMeshes().forEach((mesh) => prepareBooksMesh(mesh));

    // eye mesh
    const prepareEyeMesh = function (mesh) {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
                anim.click_eye_01.play();
                anim.click_eye_02.play();
            })
        );
    };
    const eyeMesh = boxMeshes.find((mesh) => mesh.name === BOX_NAMES.EYE);
    eyeMesh.getChildMeshes().forEach((mesh) => prepareEyeMesh(mesh));

    // gumball mesh
    const prepareGumballMesh = function (mesh) {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
                anim.knob_01.play();
                anim.gum_01.play();
            })
        );
    };
    const gumballMesh = boxMeshes.find(
        (mesh) => mesh.name === BOX_NAMES.GUMBALL
    );
    gumballMesh.getChildMeshes().forEach((mesh) => prepareGumballMesh(mesh));

    // replace location placeholders with their intended box mesh
    const placeholders = locationsMesh
        .getChildMeshes()
        .filter((mesh) => mesh.name.includes("location"));

    const locationBoxes = BOX_MESHES.map((name, i) => {
        const placeholder = placeholders.find(
            (mesh) => mesh.name === `location_${zeroPad(i + 1, 2)}`
        );
        let ret = null;
        const targetMesh = boxMeshes.find((mesh) => mesh.name === name);

        if (targetMesh) {
            // Replace placeholder materials with custom materials
            targetMesh.getChildMeshes().forEach((mesh) => {
                const { material } = mesh;
                const materialName = material.name;
                switch (materialName) {
                    case "matcap":
                        mesh.material = matCapShader;
                        break;
                    default:
                        // do nothing
                        break;
                }
            });
        }

        switch (name) {
            case BOX_NAMES.BOOKS:
            case BOX_NAMES.EYE:
            case BOX_NAMES.GOLDFISH:
            case BOX_NAMES.GUMBALL:
            case BOX_NAMES.MUG:
            case BOX_NAMES.SWITCH:
            case BOX_NAMES.TV: {
                targetMesh.position = new Vector3(
                    placeholder.position.x,
                    placeholder.position.y,
                    placeholder.position.z
                );
                targetMesh.rotation = new Vector3(
                    placeholder.rotation.x,
                    placeholder.rotation.y,
                    placeholder.rotation.z
                );
                targetMesh.parent = locationsMesh;
                targetMesh.rotation.y += Math.PI; // orient the box correctly
                targetMesh.setEnabled(true); // reveal the mesh
                placeholder.setEnabled(false); // hide the placeholder
                ret = targetMesh;
                break;
            }
            default: {
                console.error(`Box ${i} has not been configured!`);
                break;
            }
        }
        return ret;
    });

    // dispose meshes
    const targetMaterials = ["matcap"];
    scene.materials
        .filter((material) => targetMaterials.includes(material.name))
        .forEach((material) => material.dispose());

    /**
     * Camera
     */
    // Create a fixed orthographic camera
    camera = new ArcRotateCamera("camera1", 0, 0, 80, null, scene);
    // focus the camera on locationsMesh
    camera.setTarget(locationsMesh, true);
    camera.fov = 0.5;

    if (debug) {
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    }

    /**
     * Lights
     */
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Render every frame
    engine.runRenderLoop(() => {
        // Panning effect
        // if (locationsMesh) {
        //     locationsMesh.position = new Vector3(
        //         panY,
        //         locationsMesh.position.y,
        //         panX
        //     );
        // }

        const mugMesh = boxMeshes.find((mesh) => mesh.name === BOX_NAMES.MUG);
        if (mugMesh) {
            const mugMeshChildren = mugMesh.getChildMeshes();
            const containerMesh = mugMeshChildren.find(
                ({ name }) => name === "container"
            );
            containerMesh.position = new Vector3(
                panY,
                containerMesh.position.y,
                panX
            );
        }

        // Rotation effect
        if (isPanEnabled) {
            locationBoxes.forEach((mesh) => {
                if (mesh === null) return;
                gsap.to(mesh.rotation, {
                    x: panY * 0.25,
                    y: mesh.rotation.y,
                    z: panX * 0.25,
                });
            });
        }

        // Debug UI
        if (fpsEl) {
            fpsEl.innerHTML = engine.getFps().toFixed();
        }

        scene.render();
    });

    updateCameraFovMode(); // run on initial load

    // Setup animation
    locationsMesh.rotation = new Vector3(0, 0, Math.PI * 0.5);
    gsap.to(locationsMesh.rotation, {
        x: 0,
        y: -Math.PI * 0.5,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            isPanEnabled = true;
        },
    });
};

const renderDebugUi = () => {
    const markup = `
    <div class="home-scene__debug-ui">
      <div class="home-scene__debug-ui__inner">
        <div>
            <p><span class="js-fps"></span>fps</p>
            <hr />
            <p><strong>mouse coordinates:</strong></p>
            <p><span>x: <span class="js-mouse-offset-x">0</span>px</span></p>
            <p><span>y: <span class="js-mouse-offset-y">0</span>px</span></p>
        </div>
      </div>
    </div>
    `;
    const element = document.createElement("div");
    element.innerHTML = markup;
    rootEl.appendChild(element);

    // Setup element cache
    fpsEl = rootEl.querySelector(".js-fps");
    offsetXEl = rootEl.querySelector(".js-mouse-offset-x");
    offsetYEl = rootEl.querySelector(".js-mouse-offset-y");
};

const render = () => {
    rootEl.innerHTML = `
        <div class="home-scene">
            <div class="home-scene__inner">
                <canvas class="js-home-scene__canvas home-scene__canvas"></canvas>
                <button class="js-home-scene__confirm-button home-scene__confirm-button"></button>
            </div>
        </div>
    `;

    // Setup element cache
    canvas = rootEl.querySelector(".js-home-scene__canvas");
    confirmButtonEl = rootEl.querySelector(".js-home-scene__confirm-button");

    if (debug) {
        renderDebugUi();
    }
};

const init = () => {
    rootEl = document.querySelector(".js-home-scene-target");
    if (!rootEl) {
        return;
    }

    debug = new URLSearchParams(window.location.search).get("debug");

    render();
    setup();
    bindEventListeners();
    bindObservables();

    console.log("module: homeScene: init");
};

export default {
    init,
};
