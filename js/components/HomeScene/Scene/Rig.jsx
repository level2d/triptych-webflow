import { OrthographicCamera, CameraControls } from "@react-three/drei";
import { useSceneContext } from "./useSceneContext";
import { useControls, folder } from "leva";

export default function Rig() {
    const { cameraControls, intersectionPlane } = useSceneContext();
    const { intersectionPlaneVisible } = useControls({
        Rig: folder({
            intersectionPlaneVisible: false,
        }),
    });
    return (
        <>
            {/* camera */}
            <OrthographicCamera makeDefault position={[0, 0, 10]}>
                <mesh position={[0, 0, -5]} ref={intersectionPlane}>
                    <planeGeometry args={[4, 4]} />
                    <meshBasicMaterial
                        color={"black"}
                        opacity={intersectionPlaneVisible ? 0.1 : 0}
                        transparent
                    />
                </mesh>
            </OrthographicCamera>
            <CameraControls ref={cameraControls} />
        </>
    );
}
