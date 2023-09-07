import { useRef } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { constants } from "@/js/core";

export default function Cube() {
    const cubeRef = useRef(null);
    const model = useGLTF(constants.GLB_ASSET_URLS.Test_Cube);
    return (
        <>
            <group>
                <mesh
                    castShadow={true}
                    receiveShadow={true}
                    geometry={model.nodes.cube.geometry}
                    material={model.nodes.cube.material}
                    scale={0.2}
                    ref={cubeRef}
                >
                    <Outlines angle={0} thickness={0.1} color="black" />
                </mesh>
            </group>
        </>
    );
}

useGLTF.preload(constants.GLB_ASSET_URLS.Test_Cube);