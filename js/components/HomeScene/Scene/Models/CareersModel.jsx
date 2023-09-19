/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function CareersModel(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.Careers);
    const { actions } = useAnimations(animations, group);
    return (
        <Box {...props}>
            <group ref={group} dispose={null}>
                <group name="Scene">
                    <group name="careers">
                        <group name="rotation_null012">
                            <mesh
                                name="mug002"
                                castShadow
                                receiveShadow
                                geometry={nodes.mug002.geometry}
                                material={nodes.mug002.material}
                                position={[0.033, -0.017, 0.017]}
                            >
                                <mesh
                                    name="fluid"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.fluid.geometry}
                                    material={nodes.fluid.material}
                                    position={[0.01, 0.336, 0.109]}
                                    scale={1.054}
                                />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Careers);