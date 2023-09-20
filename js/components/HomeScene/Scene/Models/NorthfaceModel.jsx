/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function NorthfaceModel(props) {
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Northface);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.melting.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "northface_orbit":
                    action.play();
                    break;
                case "melting":
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
                    <group name="northface">
                        <group name="rotation_null011">
                            <mesh
                                name="Plane001"
                                castShadow
                                receiveShadow
                                geometry={nodes.Plane001.geometry}
                                material={nodes.Plane001.material}
                                morphTargetDictionary={
                                    nodes.Plane001.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.Plane001.morphTargetInfluences
                                }
                            />
                        </group>
                    </group>
                </group>
            </group>
        </Box>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Northface);
