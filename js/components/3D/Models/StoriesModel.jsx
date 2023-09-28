/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { GrainMaterialYellow, GrainMaterialYellowDark } from "../Materials";
import { Outlines } from "../Common";

export default function StoriesModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Stories);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.letter_01?.reset().play();
        actions?.letter_02?.reset().play();
        actions?.letter_03?.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "stories_orbit":
                    action.play();
                    break;
                case "letter_01":
                case "letter_02":
                case "letter_03":
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
                <group name="stories">
                    <group name="rotation_null010">
                        <mesh
                            name="Cube001"
                            geometry={nodes.Cube001.geometry}
                            //   material={materials.green_01}
                            position={[-0.152, -0.327, 0.498]}
                        >
                            <GrainMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                            <mesh
                                name="tac"
                                geometry={nodes.tac.geometry}
                                // material={materials.green_02}
                            >
                                <GrainMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                        </mesh>
                        <mesh
                            name="Cube002"
                            geometry={nodes.Cube002.geometry}
                            // material={materials.green_01}
                            position={[0.239, -0.024, 0.417]}
                        >
                            <GrainMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                            <mesh
                                name="cat"
                                geometry={nodes.cat.geometry}
                                // material={materials.green_02}
                            >
                                <GrainMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                        </mesh>
                        <mesh
                            name="Cube003"
                            geometry={nodes.Cube003.geometry}
                            //   material={materials.green_01}
                            position={[-0.192, 0.273, 0.328]}
                        >
                            <GrainMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                            <mesh
                                name="act"
                                geometry={nodes.act.geometry}
                                // material={materials.green_02}
                            >
                                <GrainMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Stories);
