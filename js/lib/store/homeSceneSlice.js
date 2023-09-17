export const createHomeSceneSlice = (set) => ({
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
});

export const createComputedHomeSceneSlice = (state) => ({
    // Camera will auto focus either a current box, or fallback to the
    // parent triptych model
    cameraTargetUuid: state.currentBoxUuid ?? state.triptychModelUuid,
    // decrease padding when focussing a box
    padding: state.currentBoxUuid ? 0.01 : 0.5,
});
