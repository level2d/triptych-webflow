/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function ShowreelModel(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.Showreel);
    const { actions } = useAnimations(animations, group);
    return (
        <Box {...props}>
            <group ref={group} dispose={null}>
                <group name="Scene">
                    <group name="showreel">
                        <group name="rotation_null007">
                            <mesh
                                name="tv005"
                                castShadow
                                receiveShadow
                                geometry={nodes.tv005.geometry}
                                material={nodes.tv005.material}
                                position={[0.002, 0.037, 0.033]}
                                rotation={[0, -0.262, 0]}
                                scale={0.908}
                            >
                                <mesh
                                    name="bezel"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.bezel.geometry}
                                    material={nodes.bezel.material}
                                />
                                <mesh
                                    name="tv003"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.tv003.geometry}
                                    material={nodes.tv003.material}
                                    position={[0, 0.092, 0.242]}
                                    scale={1.209}
                                />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Showreel);