import * as THREE from "three";

// Local cache
const cameraPosition = new THREE.Vector3();
const boundingBox = new THREE.Box3();

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
     *
     * @param {string} uuid UUID of object3d or mesh to focus
     */
    setCurrentBoxUuid: (uuid) => set(() => ({ currentBoxUuid: uuid })),
    resetCurrentBoxUuid: () => set(() => ({ currentBoxUuid: null })),

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

        switch (direction) {
            case "up": {
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(-90),
                    true,
                );
                await cameraControls.fitToBox(cameraTarget, true, {
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    paddingBottom: paddingBottom,
                    paddingLeft: paddingLeft,
                });
                break;
            }
            case "down": {
                await cameraControls.rotate(
                    0,
                    THREE.MathUtils.degToRad(90),
                    true,
                );
                await cameraControls.fitToBox(cameraTarget, true, {
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    paddingBottom: paddingBottom,
                    paddingLeft: paddingLeft,
                });
                break;
            }
            case "left": {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(-45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
            case "right":
            default: {
                await cameraControls.rotate(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(cameraPosition.y > 0 ? 45 : -45),
                    true,
                );
                break;
            }
        }
    },
});

export const createComputedHomeSceneSlice = (state) => ({
    // Camera will auto focus either a current box, or fallback to the
    // parent triptych model
    cameraTargetUuid: state.currentBoxUuid ?? state.triptychModelUuid,
    // decrease padding when focussing a box
    paddingTop: state.currentBoxUuid ? 0.01 : 0.5,
    paddingRight: state.currentBoxUuid ? 0.01 : 0.5,
    paddingBottom: state.currentBoxUuid ? 0.01 : 0.5,
    paddingLeft: state.currentBoxUuid ? 0.09 : 0.5,
});
