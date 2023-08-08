import {
    Engine,
    Scene,
    AxesViewer,
    ArcRotateCamera,
    Camera,
    Color3,
    HemisphericLight,
    SceneLoader,
    NodeMaterial,
    Vector3,
    ActionManager,
    ExecuteCodeAction,
    VideoTexture,
    StandardMaterial,
} from "@babylonjs/core/";
import { Inspector } from "@babylonjs/inspector";

// Enable GLTF/GLB loader (side-effects)
import "@babylonjs/loaders/glTF";

import { zeroPad, loadTexturesAsync } from "@/js/util/helpers";
import { BOX_MESHES, BOX_NAMES, GLB_NAMES } from "@/js/util/constants";
import { debounce } from "lodash";

const debug = false;
let rootEl = null;
let confirmButton = null;
let resizeObserver = null;
let engine = null;
let scene = null;
let canvas = null;
let coords = null;
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

    console.log({
        // xFactor,
        // panX,
        yFactor,
        panY,
    });
};

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
    window.addEventListener("keydown", (ev) => {
        if (debug) return;

        // Shift+Ctrl+I
        if (ev.shiftKey && ev.ctrlKey && ev.key === "I") {
            if (scene.debugLayer.isVisible()) {
                Inspector.Hide();
            } else {
                Inspector.Show(scene, { embedMode: true });
            }
        }
    });

    if (confirmButton) {
        confirmButton.addEventListener("click", handleConfirmClick);
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

    scene.clearColor = new Color3(255, 255, 255);

    // Debuggers
    if (debug) {
        const axes = new AxesViewer(scene, 5);
        Inspector.Show(scene, { embedMode: true });
    }

    // Create a fixed orthographic camera
    const camera = new ArcRotateCamera("camera1", 0, 0, 80, null, scene);

    // This attaches the camera to the canvas
    if (debug) {
        camera.attachControl(canvas, true);
    }

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Load matcap shader
    const asyncTexturesResult = await loadTexturesAsync(
        ["https://d3b25z3tnybfc4.cloudfront.net/assets/2d/cell_matcap_04.png"],
        scene
    ); // get the texture
    const matCapTexture = asyncTexturesResult[0];
    const matCapMaterial = await NodeMaterial.ParseFromFileAsync(
        "matcap_shader",
        "https://d3b25z3tnybfc4.cloudfront.net/assets/2d/matcap_02.json",
        scene
    ); // get the shader material
    matCapMaterial.build(false);
    const matCapShader = matCapMaterial;
    matCapShader.texture = matCapTexture; // assign the texture to the mat cap shader mesh

    // Load tv material
    const tvScreenTexture = new VideoTexture(
        "running_man",
        "https://d3b25z3tnybfc4.cloudfront.net/assets/2d/running_man_01.mp4",
        scene,
        true,
        true
    );
    const tvScreenMaterial = new StandardMaterial("tv_screen");
    tvScreenMaterial.diffuseTexture = tvScreenTexture;

    // Load locations mesh
    const locationsImportResult = await SceneLoader.ImportMeshAsync(
        "",
        "https://d3b25z3tnybfc4.cloudfront.net/assets/3d/",
        `${GLB_NAMES.Locations}.glb`,
        scene
    );

    // setup the locations root mesh
    const locationsMesh = locationsImportResult.meshes[0];
    locationsMesh.name = "locations";
    locationsMesh.rotation = new Vector3(0, Math.PI * -0.5, 0);
    // set render order
    locationsMesh.getChildMeshes().forEach((mesh) => {
        mesh.renderingGroupId = 1;
    });

    // focus the camera on this mesh
    camera.setTarget(locationsMesh, true);
    camera.fov = 0.5;

    // load box meshes
    const boxMeshes = await Promise.all(
        Object.keys(BOX_NAMES)
            .map((key) => BOX_NAMES[key])
            .map(async (name) => {
                const filename = GLB_NAMES[name];
                const importResult = await SceneLoader.ImportMeshAsync(
                    "",
                    // "https://d3b25z3tnybfc4.cloudfront.net/assets/3d/",
                    "/assets/3d/",
                    `${filename}.glb`,
                    scene
                );
                const rootMesh = importResult.meshes[0];
                rootMesh.name = name; // give it a unique name for grabbing it later
                rootMesh.rotation = new Vector3(0, Math.PI * -0.5, 0); // rotate it correctly
                rootMesh.setEnabled(false); // hide the box
                switch (name) {
                    case BOX_NAMES.TV: {
                        const childMeshes = rootMesh.getChildMeshes();
                        const screenMesh = childMeshes.find(
                            (mesh) => mesh.name === "screen"
                        );
                        screenMesh.material = tvScreenMaterial;
                        const targets = [
                            "walls",
                            "walls_primitive0",
                            "walls_primitive1",
                        ];
                        childMeshes
                            .filter(({ name }) => !targets.includes(name))
                            .forEach((mesh) => {
                                mesh.renderingGroupId = 3;
                            });
                    }
                    default:
                        break;
                }
                return rootMesh;
            })
    );

    // animation cache
    const anim = {};
    anim.button_01 = scene.getAnimationGroupByName("button_01");
    anim.socket = scene.getAnimationGroupByName("socket");
    anim.eye = scene.getAnimationGroupByName("eye");
    anim.upper_lid = scene.getAnimationGroupByName("upper_lid");
    anim.lower_lid = scene.getAnimationGroupByName("lower_lid");
    anim.click_eye_01 = scene.getAnimationGroupByName("click_eye_01");
    anim.click_eye_02 = scene.getAnimationGroupByName("click_eye_02");

    const autoplayAnimations = [
        { name: "button_01", loop: false },
        { name: "socket", loop: true },
        { name: "eye", loop: true },
        { name: "upper_lid", loop: true },
        { name: "lower_lid", loop: true },
    ];

    // Play animations
    autoplayAnimations.forEach(({ name, loop }) => {
        const targetAnim = anim[name];
        targetAnim.reset();
        targetAnim.play(loop);
    });

    // setup mesh specific actions
    // button mesh
    const prepareButtonMesh = function (mesh) {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
                anim.button_01.play();
            })
        );
    };

    const buttonMesh = boxMeshes.find((mesh) => mesh.name === BOX_NAMES.BUTTON);
    buttonMesh.getChildMeshes().forEach((mesh) => prepareButtonMesh(mesh));

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

    // replace location placeholders with their intended box mesh
    const placeholders = locationsMesh
        .getChildMeshes()
        .filter((mesh) => mesh.name.includes("location"));

    const locationBoxes = BOX_MESHES.map((name, i) => {
        const placeholder = placeholders.find(
            (mesh) => mesh.name === `location_${zeroPad(i + 1, 2)}`
        );
        let ret = null;
        const targetMeshName = BOX_MESHES[i];
        const targetMesh = boxMeshes.find((mesh) => mesh.name === name);

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

        switch (name) {
            case BOX_NAMES.BUTTON:
            case BOX_NAMES.EYE:
            case BOX_NAMES.TV: {
                targetMesh.position = new Vector3(
                    placeholder.position.x,
                    placeholder.position.y,
                    placeholder.position.z
                );
                targetMesh.setEnabled(true); // reveal the mesh
                ret = targetMesh;
                break;
            }
            case BOX_NAMES.BOX: {
                const clone = targetMesh.clone(
                    `${targetMeshName}_${zeroPad(i + 1, 2)}`
                );
                clone.position = new Vector3(
                    placeholder.position.x,
                    placeholder.position.y,
                    placeholder.position.z
                );
                clone.setEnabled(true); // reveal the clone
                ret = clone;
                break;
            }
            default: {
                console.error(`Mesh ${name} has not been configured!`);
                break;
            }
        }

        placeholder.setEnabled(false); // hide the placeholder

        return ret;
    });

    // dispose meshes
    const targetMaterials = ["matcap"];
    scene.materials
        .filter((material) => targetMaterials.includes(material.name))
        .forEach((material) => material.dispose());

    // Render every frame
    engine.runRenderLoop(() => {
        // Panning effect
        if (locationsMesh) {
            locationsMesh.position = new Vector3(
                panY,
                locationsMesh.position.y,
                panX
            );
        }

        // Rotation effect
        locationBoxes.forEach((mesh) => {
            mesh.rotation = new Vector3(
                panY * 0.25,
                mesh.rotation.y,
                panX * 0.25
            );
        });
        scene.render();
    });

    const updateCameraFovMode = () => {
        if (
            scene.getEngine().getRenderHeight() >
            scene.getEngine().getRenderWidth()
        ) {
            camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
        } else {
            camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;
        }
    };

    // Change fovMode to keep scene scaling within any aspect ratio
    engine.onResizeObservable.add(() => updateCameraFovMode); // run on resize
    updateCameraFovMode(); // run on initial load
};

const renderCords = () => {
    const markup = `
    <div class="js-home-scene__coords home-scene__coords">
      <div class="home-scene__coords__inner">
        <div>
          <p><strong>Mouse Coordinates:</strong></p>
          <p>
            <span>X:<span class="js-offset-x">0</span></span>
            <span>Y:<span class="js-offset-y">0</span></span>
          </p>
        </div>
      </div>
    </div>
    `;
    const element = document.createElement("div");
    element.innerHTML = markup;
    rootEl.appendChild(element);
};

const render = () => {
    rootEl.innerHTML = `
        <div class="home-scene">
            <div className="home-scene__inner">
                <canvas class="js-home-scene__canvas home-scene__canvas" />
                <button class="js-home-scene__confirm-button home-scene__confirm-button">
            </div>
        </div>
    `;
};

const init = () => {
    rootEl = document.querySelector(".js-home-scene-target");
    if (!rootEl) {
        return;
    }

    render();

    canvas = rootEl.querySelector(".js-home-scene__canvas");
    confirmButton = rootEl.querySelector(".js-home-scene__confirm-button");

    if (debug) {
        renderCords();
        coords = rootEl.querySelector(".js-home-scene__coords");
        offsetXEl = rootEl.querySelector(".js-offset-x");
        offsetYEl = rootEl.querySelector(".js-offset-y");
    }

    setup();
    bindEventListeners();
    bindObservables();

    console.log("module: homeScene: init");
};

export default {
    init,
};
