/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function EyeModel(props) {
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.Eye);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.pupil.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "pupil":
                    action.loop = THREE.LoopOnce;
                    break;
                default:
                    break;
            }
        });
    }, [mounted, actions, names]);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <Box {...props}>
            <group ref={group} dispose={null} onClick={handleClick}>
                <group name="Scene">
                    <group name="eye">
                        <group name="rotation_null008">
                            <mesh
                                name="eye001"
                                castShadow
                                receiveShadow
                                geometry={nodes.eye001.geometry}
                                material={nodes.eye001.material}
                                morphTargetDictionary={
                                    nodes.eye001.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.eye001.morphTargetInfluences
                                }
                            >
                                <mesh
                                    name="iris"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.iris.geometry}
                                    material={nodes.iris.material}
                                    morphTargetDictionary={
                                        nodes.iris.morphTargetDictionary
                                    }
                                    morphTargetInfluences={
                                        nodes.iris.morphTargetInfluences
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

useGLTF.preload(GLB_ASSET_URLS.Eye);
