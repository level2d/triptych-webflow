import * as THREE from "three";
import gsap from "@/js/lib/gsap";
import { debug } from "@/js/core/constants";

// Local cache
const cameraPosition = new THREE.Vector3();
const boundingBox = new THREE.Box3();
const INTERACTIVE_MODEL_NAMES = [
    "EyeModel",
    "SkullModel",
    "KeyModel",
    "GyroModel",
];

/**
 *
 * @typedef {"up" | "right" | "down" | "left"} direction
 */

export const createHomeSceneSlice = (set, get) => ({
    /**
     * @description This will transform into a getter function once the r3f
     * canvas is created. This escape hatch allows our local zustand store to
     * get() the r3f instance's store.
     */
    getR3fStore: () => {},
    setGetR3fStore: (getR3fStore) => set(() => ({ getR3fStore })),

    homeSceneOpacity: debug ? 1.0 : 0.0,

    isClickable: false,
    setIsClickable: (isClickable) => set(() => ({ isClickable })),

    /**
     * @type {(null | string)}
     */
    triptychModelUuid: null,
    /**
     *
     * @param {string} uuid UUID of object3d or mesh to focus
     */
    setTriptychModelUuid: (uuid) => set(() => ({ triptychModelUuid: uuid })),

    /**
     * @type {(null | string)}
     */
    currentBoxUuid: null,
    /**
     * @type {(null | string)}
     */
    currentBoxModelName: null,
    /**
     *
     * @param {typeof import("three").Object3D} object3d Object3d to focus
     */
    setCurrentBoxFromObject3d: async (object3d) => {
        const { uuid, name } = object3d;
        const obj = {
            opacity: 1.0,
        };

        gsap.fromTo(
            obj,
            { opacity: 1.0 },
            {
                opacity: 0.0,
                duration: 0.25,
                ease: "power2.inOut",
                onStart: () => {
                    set(() => ({
                        currentBoxUuid: uuid,
                        currentBoxModelName: name,
                    }));
                },
                onUpdate: () => {
                    set({ homeSceneOpacity: obj.opacity });
                },
            },
        );
    },
    resetCurrentBoxState: async () => {
        const obj = {
            opacity: 0.0,
        };
        gsap.fromTo(
            obj,
            { opacity: 0.0 },
            {
                opacity: 1.0,
                duration: 0.25,
                ease: "power2.inOut",
                onUpdate: () => {
                    set({ homeSceneOpacity: obj.opacity });
                },
                onComplete: () => {
                    set(() => ({
                        currentBoxUuid: null,
                        currentBoxModelName: null,
                    }));
                },
            },
        );
    },

    /**
     * @type {(null | string)}
     */
    lookAtMeshUuid: null,
    /**
     *
     * @param {string} uuid UUID of object3d or mesh to focus
     */
    setLookAtMeshUuid: (uuid) => set(() => ({ lookAtMeshUuid: uuid })),

    /**
     *
     * @param {direction} direction To orbit camera to
     */
    orbit: async (direction) => {
        const cameraControls = get().getR3fStore().controls;
        if (!cameraControls) return;

        const scene = get().getR3fStore().scene;
        const paddingTop = get().paddingTop;
        const paddingRight = get().paddingRight;
        const paddingBottom = get().paddingBottom;
        const paddingLeft = get().paddingLeft;
        const cameraTargetUuid = get().cameraTargetUuid;
        const cameraTarget = scene.getObjectByProperty(
            "uuid",
            cameraTargetUuid,
        );

        if (!cameraTarget.geometry) return;

        // Store camera position to local Vector3
        cameraControls.getPosition(cameraPosition, true);
        // Calc bounds of camera target
        cameraTarget.geometry.computeBoundingSphere();

        // Store bounding box to local Box3
        const boundingSphere = cameraTarget.geometry.boundingSphere.clone();
        boundingSphere.getBoundingBox(boundingBox);

        // determine if camera is animating from an "up" position
        const isFromUp = cameraPosition.y > 0;
        const isFromDown = cameraPosition.y <= 0;

        switch (direction) {
            case "up": {
                if (isFromUp) {
                    return; // short circuit if camera is from an up position
                }
                cameraControls.normalizeRotations();
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                break;
            }
            case "down": {
                if (isFromDown) {
                    return; // short circuit if camera is from a down position
                }
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(90),
                    true,
                );
                break;
            }
            case "left": {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(-45),
                    THREE.MathUtils.degToRad(isFromUp ? 45 : -45),
                    true,
                );
                break;
            }
            case "right":
            default: {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(isFromUp ? 45 : -45),
                    true,
                );
                break;
            }
        }

        if (isFromUp || direction === "up") {
            // focus camera to target when coming from an up position, or if orbiting up
            await cameraControls.fitToBox(cameraTarget, true, {
                paddingTop: paddingTop,
                paddingRight: paddingRight,
                paddingBottom: paddingBottom,
                paddingLeft: paddingLeft,
            });
        }
    },
    interactable: debug,
    introPlayed: false,
    intro: async () => {
        const cameraControls = get().getR3fStore().controls;
        if (!cameraControls) return;

        const scene = get().getR3fStore().scene;
        const cameraTargetUuid = get().cameraTargetUuid;
        const cameraTarget = scene.getObjectByProperty(
            "uuid",
            cameraTargetUuid,
        );

        if (!cameraTarget.geometry) return;

        // Store camera position to local Vector3
        cameraControls.getPosition(cameraPosition, true);
        // Calc bounds of camera target
        cameraTarget.geometry.computeBoundingSphere();

        // Store bounding box to local Box3
        const boundingSphere = cameraTarget.geometry.boundingSphere.clone();
        boundingSphere.getBoundingBox(boundingBox);

        const obj = {
            opacity: 0.0,
        };

        gsap.fromTo(
            obj,
            { opacity: 0.0 },
            {
                opacity: 1.0,
                duration: 0.25,
                ease: "power2.inOut",
                onUpdate: () => {
                    set({ homeSceneOpacity: obj.opacity });
                },
            },
        );

        cameraControls.smoothTime = 0.5;

        await cameraControls.rotate(
            THREE.MathUtils.degToRad(-45),
            THREE.MathUtils.degToRad(-45),
            true,
        );

        cameraControls.smoothTime = 0.25; // reset back to default

        await cameraControls.rotate(
            THREE.MathUtils.degToRad(-45),
            THREE.MathUtils.degToRad(45),
            true,
        );

        cameraControls.normalizeRotations();

        set({ introPlayed: true, interactable: true });
    },
});

export const createComputedHomeSceneSlice = (state) => ({
    // Camera will auto focus either a current box, or fallback to the
    // parent triptych model
    cameraTargetUuid: state.currentBoxUuid ?? state.triptychModelUuid,
    // decrease padding when focussing a box
    paddingTop: state.currentBoxUuid ? 0.01 : 0.3,
    paddingRight: state.currentBoxUuid ? 0.01 : 0.1,
    paddingBottom: state.currentBoxUuid ? 0.01 : 0.4,
    paddingLeft: state.currentBoxUuid
        ? INTERACTIVE_MODEL_NAMES.includes(state.currentBoxModelName)
            ? 0.01
            : 0.09
        : 0.1,
});
