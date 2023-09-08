import { forwardRef } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useControls } from "leva";

function _Model(props, ref) {
    const { nodes, materials } = useGLTF(GLB_ASSET_URLS.Locations);
    const { uHeight, uPatternScale } = useControls("Triptych Grain Shader", {
        uHeight: {
            value: 10,
            min: 1,
            max: 20,
            step: 1,
        },
        uPatternScale: {
            value: 0.001,
            min: 0,
            max: 0.5,
            step: 0.0001,
        },
    });
    return (
        <group {...props} dispose={null} scale={0.1}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.triptych.geometry}
                // material={nodes.triptych.material}
                ref={ref}
            >
                <grainShaderMaterial
                    uHeight={uHeight}
                    uPatternScale={{ x: uPatternScale, y: uPatternScale }}
                />
                <Outlines thickness={0.05} color={"black"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.water.geometry}
                material={nodes.water.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_015.geometry}
                material={nodes.location_015.material}
                position={[1, 1, -3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_001.geometry}
                material={nodes.location_001.material}
                position={[1, 3, -3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_002.geometry}
                material={nodes.location_002.material}
                position={[-3, -1, -3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_003.geometry}
                material={nodes.location_003.material}
                position={[-3, 3, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_004.geometry}
                material={nodes.location_004.material}
                position={[-1, -1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_005.geometry}
                material={nodes.location_005.material}
                position={[3, -1, 3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_006.geometry}
                material={nodes.location_006.material}
                position={[-1, -3, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_007.geometry}
                material={nodes.location_007.material}
                position={[1, -1, -1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_008.geometry}
                material={nodes.location_008.material}
                position={[-1, 3, 3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_009.geometry}
                material={nodes.location_009.material}
                position={[-3, -3, -3]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_010.geometry}
                material={nodes.location_010.material}
                position={[3, 3, -1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_011.geometry}
                material={nodes.location_011.material}
                position={[3, -3, -1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_012.geometry}
                material={nodes.location_012.material}
                position={[1, -3, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_013.geometry}
                material={nodes.location_013.material}
                position={[-1, 1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_014.geometry}
                material={nodes.location_014.material}
                position={[3, 1, 3]}
            />
        </group>
    );
}

const Model = forwardRef(_Model);
export default Model;

useGLTF.preload(GLB_ASSET_URLS.Locations);
