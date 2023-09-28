/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import {
    GrainMaterialYellow,
    GrainMaterialYellowDark,
    OutlineMaterial,
} from "../Materials";

export default function WorkModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Work);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.glove_01.reset().play();
        actions?.glove_02.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "work_orbit":
                    action.play();
                    break;
                case "glove_01":
                case "glove_02":
                    action.loop = THREE.LoopOnce;
                    break;
                default:
                    break;
            }
        });
    }, [mounted, actions, names]);

    // setup uniforms
    useEffect(() => {
        const bb = new THREE.Box3();
        bb.setFromObject(group.current);
        setBoundingBox(bb);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <group ref={group} {...props} dispose={null} onClick={handleClick}>
            <group name="Scene">
                <group name="work">
                    <group name="rotation_null002">
                        <mesh
                            name="hand"
                            geometry={nodes.hand.geometry}
                            //   material={materials.green_01}
                            morphTargetDictionary={
                                nodes.hand.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.hand.morphTargetInfluences
                            }
                            position={[0.026, -0.067, -0.021]}
                        >
                            <GrainMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                        </mesh>
                        <mesh
                            name="hand_outline"
                            geometry={nodes.hand_outline.geometry}
                            //   material={materials.outline}
                            morphTargetDictionary={
                                nodes.hand_outline.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.hand_outline.morphTargetInfluences
                            }
                            position={[0.026, -0.067, -0.021]}
                        >
                            <OutlineMaterial opacity={opacity} />
                        </mesh>
                        <mesh
                            name="tie"
                            geometry={nodes.tie.geometry}
                            //   material={materials.green_02}
                            morphTargetDictionary={
                                nodes.tie.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.tie.morphTargetInfluences
                            }
                            position={[0.026, -0.067, -0.021]}
                        >
                            <GrainMaterialYellowDark
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                        </mesh>
                        <mesh
                            name="tie_outline"
                            geometry={nodes.tie_outline.geometry}
                            //   material={materials.outline}
                            morphTargetDictionary={
                                nodes.tie_outline.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.tie_outline.morphTargetInfluences
                            }
                            position={[0.026, -0.067, -0.021]}
                        >
                            <OutlineMaterial opacity={opacity} />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Work);
