export const createHomeSceneSlice = (set) => ({
    /**
     * @type {(null | string)}
     */
    cameraTargetUuid: null,
    /**
     *
     * @param {string} uuid UUID of object3d or mesh to focus
     */
    setCameraTargetUuid: (uuid) => set(() => ({ cameraTargetUuid: uuid })),
});
