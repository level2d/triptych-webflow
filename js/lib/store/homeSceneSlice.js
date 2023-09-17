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
});

export const createComputedHomeSceneSlice = (state) => ({
    // Camera will auto focus either a current box, or fallback to the
    // parent triptych model
    cameraTargetUuid: state.currentBoxUuid ?? state.triptychModelUuid,
});
