/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Box } from "../Common";

export default function CareersModel(props) {
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(GLB_ASSET_URLS.Careers);
    const { actions, names } = useAnimations(animations, group.current);

    const handleClick = useCallback(() => {
        actions?.fluid.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "careers_orbit":
                    action.play();
                    break;
                case "fluid":
                    action.clampWhenFinished = false; // stay on last frame
                    action.setLoop(THREE.LoopOnce);
                    action.repetitions = 1;
                    break;
                default:
                    break;
            }
        });
    }, [actions, names, mounted]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Box {...props}>
            <group ref={group} dispose={null} onClick={handleClick}>
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
