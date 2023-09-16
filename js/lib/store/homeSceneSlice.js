import * as THREE from "three";

export const createHomeSceneSlice = (set) => ({
    cameraTarget: new THREE.Object3D(),
    setCameraTarget: (object3D) => set(() => ({ cameraTarget: object3D })),
});
