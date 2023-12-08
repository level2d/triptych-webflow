import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import * as THREE from "three";

import { debug } from "@/js/core/constants";
import { isDesktop } from "@/js/core/detect";
import { useStore } from "@/js/lib/store";

export default function Rig() {
    const lookAtMesh = useRef(null);
    const cameraOrbitPoint = useRef(new THREE.Vector3());
    const boxSize = useRef(new THREE.Vector2());
    const intro = useStore((state) => state.intro);
    const cameraTargetUuid = useStore((state) => state.cameraTargetUuid);
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } = useStore(
        (state) => ({
            paddingTop: state.paddingTop,
            paddingRight: state.paddingRight,
            paddingBottom: state.paddingBottom,
            paddingLeft: state.paddingLeft,
        }),
    );
    const setLookAtMeshUuid = useStore((state) => state.setLookAtMeshUuid);
    const {
        size: { width, height },
        controls: cameraControls,
        scene,
    } = useThree((state) => ({
        size: state.size,
        controls: state.controls,
        scene: state.scene,
    }));

    const { lookAtMeshVisible, lookAtFactor, enableDebugControls } =
        useControls({
            Rig: folder({
                lookAtMeshVisible: false,
                lookAtFactor: {
                    value: 8,
                    min: 0.1,
                    max: 20,
                    step: 0.1,
                },
                enableDebugControls: debug,
            }),
        });

    const handleCameraControlsOnStart = useCallback(
        (e) => {
            if (!enableDebugControls) {
                e.target.cancel();
            }
        },
        [enableDebugControls],
    );

    useFrame(({ camera, pointer, viewport }) => {
        if (!isDesktop) return; // disable on mobile
        if (!lookAtMesh.current) return;
        const { height, width } = viewport.getCurrentViewport(
            camera,
            [0, 0, -1], // account for distance of lookAtMesh from camera
        );
        const x = (pointer.x * width) / 2;
        const y = (pointer.y * height) / 2;
        lookAtMesh.current.position.x = x * lookAtFactor;
        lookAtMesh.current.position.y = y * lookAtFactor;
    });

    const cameraTarget = useMemo(() => {
        if (!cameraTargetUuid) return null;
        return scene.getObjectByProperty("uuid", cameraTargetUuid);
    }, [cameraTargetUuid, scene]);

    useEffect(() => {
        if (!cameraTarget) return;
        if (!cameraControls) return;

        cameraTarget.getWorldPosition(cameraOrbitPoint.current);

        const focusCamera = async () => {
            await cameraControls.setOrbitPoint(
                cameraOrbitPoint.current.x,
                cameraOrbitPoint.current.y,
                cameraOrbitPoint.current.z,
            );
            await cameraControls.fitToBox(cameraTarget, true, {
                paddingTop: paddingTop,
                paddingRight: paddingRight,
                paddingBottom: paddingBottom,
                paddingLeft: paddingLeft,
            });

            if (debug) {
                return;
            }

            intro();
        };
        focusCamera();
    }, [
        cameraTarget,
        cameraControls,
        width,
        height,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        intro,
    ]);

    useEffect(() => {
        if (!cameraControls) return;
        window.cameraControls = cameraControls;
    }, [cameraControls]);

    useEffect(() => {
        lookAtMesh.current.geometry.computeBoundingBox();
        const boxWidth =
            lookAtMesh.current.geometry.boundingBox.max.x -
            lookAtMesh.current.geometry.boundingBox.min.x;
        const boxHeight =
            lookAtMesh.current.geometry.boundingBox.max.y -
            lookAtMesh.current.geometry.boundingBox.min.y;
        boxSize.current.set(boxWidth, boxHeight);
        setLookAtMeshUuid(lookAtMesh.current.uuid);
    }, [setLookAtMeshUuid]);

    return (
        <>
            {/* camera */}
            <OrthographicCamera makeDefault position={[0, 0, 10]}>
                <mesh position={[0, 0, -1]} ref={lookAtMesh}>
                    <planeGeometry />
                    <meshBasicMaterial
                        color={"black"}
                        opacity={lookAtMeshVisible ? 0.5 : 0.0}
                        transparent
                    />
                </mesh>
            </OrthographicCamera>
            <CameraControls makeDefault onStart={handleCameraControlsOnStart} />
        </>
    );
}
