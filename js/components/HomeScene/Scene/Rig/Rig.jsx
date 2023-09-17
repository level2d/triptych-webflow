import { useEffect, useMemo } from "react";
import { OrthographicCamera, CameraControls } from "@react-three/drei";
import { useSceneContext } from "../useSceneContext";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { debug } from "@/js/core/constants";
import Actions from "./Actions";
import { useStore } from "@/js/lib/store";

export default function Rig() {
    const cameraTargetUuid = useStore((state) => state.cameraTargetUuid);
    const padding = useStore((state) => state.padding);
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
                max: 2,
                step: 0.1,
            },
        }),
    });

    const { lookAtMesh } = useSceneContext();

    useFrame(({ pointer, viewport }) => {
        if (!lookAtMesh.current) return;
        const width = viewport.distance / viewport.aspect;
        const height = width * viewport.aspect;
        const x = pointer.x * (width * lookAtFactor);
        const y = pointer.y * (height * lookAtFactor);
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
        const focusCamera = async () => {
            await cameraControls.setOrbitPoint(
                cameraTarget.position.x,
                cameraTarget.position.y,
                cameraTarget.position.z,
            );
            await cameraControls.fitToBox(cameraTarget, true, {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding,
            });
        };
        focusCamera();
    }, [width, height, cameraTarget, cameraControls, padding]);

    useEffect(() => {
        if (!cameraControls) return;
        if (!debug) {
            cameraControls.disconnect();
        }
    }, [cameraControls]);

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
