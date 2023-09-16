import { OrthographicCamera, CameraControls } from "@react-three/drei";
import { useSceneContext } from "../useSceneContext";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { debug } from "@/js/core/constants";
import Actions from "./Actions";

export default function Rig() {
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
