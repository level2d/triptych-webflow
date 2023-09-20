/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function SosModel(props) {
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.SOS);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.fish_02?.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "fish_orbit":
                case "fish_01":
                case "bob":
                    action.play();
                    break;
                case "fish_02":
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
                    <group name="sos">
                        <group name="rotation_null003">
                            <mesh
                                name="fish002"
                                castShadow
                                receiveShadow
                                geometry={nodes.fish002.geometry}
                                material={nodes.fish002.material}
                                morphTargetDictionary={
                                    nodes.fish002.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.fish002.morphTargetInfluences
                                }
                                position={[0.019, -0.075, 0.072]}
                                rotation={[0, -0.273, 0]}
                            />
                            <group
                                name="fish_02_holder"
                                position={[0, -0.075, 0]}
                                rotation={[0, -Math.PI / 6, 0]}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.SOS);
