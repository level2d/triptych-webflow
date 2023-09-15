import { OrthographicCamera, CameraControls } from "@react-three/drei";
import { useSceneContext } from "./useSceneContext";
import { useFrame } from "@react-three/fiber";

export default function Rig() {
    const { cameraControls, lookAtMesh } = useSceneContext();
    useFrame(({ pointer, viewport }) => {
        if (!lookAtMesh.current) return;
        const x = pointer.x * (viewport.width * 0.5) * 0.025;
        const y = pointer.y * (viewport.height * 0.5) * 0.025;
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
                        opacity={0.2}
                        transparent
                    />
                </mesh>
            </OrthographicCamera>
            <CameraControls ref={cameraControls} />
        </>
    );
}
