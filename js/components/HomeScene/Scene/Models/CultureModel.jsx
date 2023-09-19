/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function Model(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.Culture);
    const { actions } = useAnimations(animations, group);
    return (
        <Box {...props}>
            <group ref={group} dispose={null}>
                <group name="Scene">
                    <group name="culture">
                        <group name="rotation_null015">
                            <mesh
                                name="camera001"
                                castShadow
                                receiveShadow
                                geometry={nodes.camera001.geometry}
                                material={nodes.camera001.material}
                                morphTargetDictionary={
                                    nodes.camera001.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.camera001.morphTargetInfluences
                                }
                                position={[0.033, -0.076, -0.111]}
                                rotation={[0, -Math.PI / 9, 0]}
                            >
                                <mesh
                                    name="frame"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.frame.geometry}
                                    material={nodes.frame.material}
                                    morphTargetDictionary={
                                        nodes.frame.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.frame.morphTargetInfluences
                                    }
                                />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Culture);
