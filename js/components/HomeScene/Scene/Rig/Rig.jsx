import { useEffect, useMemo, useRef } from "react";
import { OrthographicCamera, CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { folder, useControls } from "leva";

import { debug } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";
import Actions from "./Actions";

export default function Rig() {
    const lookAtMesh = useRef(null);
    const cameraOrbitPoint = useRef(new THREE.Vector3());
    const boxSize = useRef(new THREE.Vector2());
    const cameraTargetUuid = useStore((state) => state.cameraTargetUuid);
    const padding = useStore((state) => state.padding);
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

    const { lookAtMeshVisible, lookAtFactor } = useControls({
        Rig: folder({
            lookAtMeshVisible: debug,
            lookAtFactor: {
                value: 1,
                min: 0.1,
                max: 20,
                step: 0.1,
            },
        }),
    });

    useFrame(({ pointer, viewport }) => {
        if (!lookAtMesh.current) return;
        const { aspect } = viewport;
        const boxWidth = boxSize.current.x;
        const boxHeight = boxSize.current.y;
        const translateX = (boxWidth * aspect) / 2;
        const translateY = boxHeight / aspect / 2;
        const x = pointer.x * translateX * lookAtFactor;
        const y = pointer.y * translateY * lookAtFactor;
        lookAtMesh.current.position.x = x;
        lookAtMesh.current.position.y = y;
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
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding,
            });
        };
        focusCamera();
    }, [cameraTarget, cameraControls, width, height, padding]);

    useEffect(() => {
        if (!cameraControls) return;
        if (!debug) {
            cameraControls.disconnect();
        }
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
    }, []);

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
            <CameraControls makeDefault />
            <Actions />
        </>
    );
}
