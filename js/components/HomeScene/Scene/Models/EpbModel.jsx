/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function EpbModel(props) {
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.EPB);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.bolt.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "epb_orbit":
                    action.play();
                    break;
                case "bolt":
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
                    <group name="epb">
                        <group name="rotation_null013">
                            <mesh
                                name="bolt001"
                                castShadow
                                receiveShadow
                                geometry={nodes.bolt001.geometry}
                                material={nodes.bolt001.material}
                                morphTargetDictionary={
                                    nodes.bolt001.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.bolt001.morphTargetInfluences
                                }
                                position={[-0.024, 0.093, 0.006]}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.EPB);
