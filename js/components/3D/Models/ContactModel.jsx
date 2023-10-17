/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import {
    ItemMaterialYellow,
    ItemMaterialYellowDark,
} from "@/js/components/3D/Materials";
import { ModelOutlines } from "@/js/components/3D/Common";

export default function ContactModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Contact);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.blade_01.reset().play();
        actions?.blade_02.reset().play();
        actions?.blade_03.reset().play();
        actions?.blade_04.reset().play();
        actions?.blade_05.reset().play();
        actions?.blade_06.reset().play();
        actions?.blade_07.reset().play();
        actions?.blade_08.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "contact_orbit":
                    action.play();
                    break;
                case "blade_01":
                case "blade_02":
                case "blade_03":
                case "blade_04":
                case "blade_05":
                case "blade_06":
                case "blade_07":
                case "blade_08":
                    action.setLoop(THREE.LoopOnce);
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
        <group
            {...props}
            name="ContactModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="contact">
                    <group name="rotation_null">
                        <mesh
                            name="ufo002"
                            geometry={nodes.ufo002.geometry}
                            //   material={materials.green_01}
                            morphTargetDictionary={
                                nodes.ufo002.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.ufo002.morphTargetInfluences
                            }
                            position={[0.001, 0.047, 0.022]}
                            rotation={[-0.204, 0, 0]}
                            scale={0.8}
                        >
                            <ItemMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <ModelOutlines opacity={opacity} />
                            <mesh
                                name="thruster_01"
                                geometry={nodes.thruster_01.geometry}
                                // material={materials.green_02}
                                position={[0.19, -0.367, 0.002]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_02"
                                geometry={nodes.thruster_02.geometry}
                                // material={materials.green_02}
                                position={[0.136, -0.367, -0.133]}
                                rotation={[0, Math.PI / 4, 0]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_03"
                                geometry={nodes.thruster_03.geometry}
                                // material={materials.green_02}
                                position={[0.002, -0.367, -0.19]}
                                rotation={[0, Math.PI / 2, 0]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_04"
                                geometry={nodes.thruster_04.geometry}
                                // material={materials.green_02}
                                position={[-0.133, -0.367, -0.136]}
                                rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_05"
                                geometry={nodes.thruster_05.geometry}
                                // material={materials.green_02}
                                position={[-0.19, -0.367, -0.002]}
                                rotation={[Math.PI, 0, Math.PI]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_06"
                                geometry={nodes.thruster_06.geometry}
                                // material={materials.green_02}
                                position={[-0.136, -0.367, 0.133]}
                                rotation={[Math.PI, -Math.PI / 4, Math.PI]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_07"
                                geometry={nodes.thruster_07.geometry}
                                // material={materials.green_02}
                                position={[-0.002, -0.367, 0.19]}
                                rotation={[0, -1.571, 0]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="thruster_08"
                                geometry={nodes.thruster_08.geometry}
                                // material={materials.green_02}
                                position={[0.133, -0.367, 0.136]}
                                rotation={[0, -Math.PI / 4, 0]}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="windows"
                                geometry={nodes.windows.geometry}
                                // material={materials.green_02}
                                morphTargetDictionary={
                                    nodes.windows.morphTargetDictionary
                                }
                                morphTargetInfluences={
                                    nodes.windows.morphTargetInfluences
                                }
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <ModelOutlines opacity={opacity} />
                            </mesh>
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Contact);
