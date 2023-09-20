/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function PhoneModel(props) {
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Phone);
    const { actions } = useAnimations(animations, group);
    return (
        <Box {...props}>
            <group ref={group} dispose={null}>
                <group name="Scene">
                    <group name="phone">
                        <group name="rotation_null004">
                            <mesh
                                name="Telephone_01"
                                castShadow
                                receiveShadow
                                geometry={nodes.Telephone_01.geometry}
                                material={nodes.Telephone_01.material}
                                position={[0, 0.02, 0.065]}
                            >
                                <mesh
                                    name="button_01"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.button_01.geometry}
                                    material={nodes.button_01.material}
                                    morphTargetDictionary={
                                        nodes.button_01.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.button_01.morphTargetInfluences
                                    }
                                    position={[-0.104, -0.013, 0.196]}
                                    rotation={[1.148, 0, 0]}
                                />
                                <mesh
                                    name="button_02"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.button_02.geometry}
                                    material={nodes.button_02.material}
                                    morphTargetDictionary={
                                        nodes.button_02.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.button_02.morphTargetInfluences
                                    }
                                    position={[0.001, -0.013, 0.196]}
                                    rotation={[1.148, 0, 0]}
                                />
                                <mesh
                                    name="button_03"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.button_03.geometry}
                                    material={nodes.button_03.material}
                                    morphTargetDictionary={
                                        nodes.button_03.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.button_03.morphTargetInfluences
                                    }
                                    position={[0.001, -0.11, 0.238]}
                                    rotation={[1.148, 0, 0]}
                                />
                                <mesh
                                    name="button_04"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.button_04.geometry}
                                    material={nodes.button_04.material}
                                    morphTargetDictionary={
                                        nodes.button_04.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.button_04.morphTargetInfluences
                                    }
                                    position={[0.106, -0.206, 0.281]}
                                    rotation={[1.148, 0, 0]}
                                />
                                <mesh
                                    name="button_05"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.button_05.geometry}
                                    material={nodes.button_05.material}
                                    morphTargetDictionary={
                                        nodes.button_05.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.button_05.morphTargetInfluences
                                    }
                                    position={[-0.104, -0.302, 0.324]}
                                    rotation={[1.148, 0, 0]}
                                />
                                <mesh
                                    name="static_buttons"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.static_buttons.geometry}
                                    material={nodes.static_buttons.material}
                                />
                                <mesh
                                    name="Telephone_01001"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Telephone_01001.geometry}
                                    material={nodes.Telephone_01001.material}
                                    position={[-0.013, 0.183, -0.137]}
                                />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Phone);
