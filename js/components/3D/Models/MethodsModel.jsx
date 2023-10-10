/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Outlines } from "../Common";
import { ItemMaterialYellow, ItemMaterialYellowDark } from "../Materials";

export default function MethodsModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Methods);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.gear_01?.reset().play();
        actions?.gear_02?.reset().play();
        actions?.gear_03?.reset().play();
        actions?.gear_04?.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "methods_orbit":
                    action.play();
                    break;
                case "gear_01":
                case "gear_02":
                case "gear_03":
                case "gear_04":
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
        <group
            {...props}
            name="MethodsModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="methods">
                    <group name="rotation_null016">
                        <group
                            name="shaft"
                            rotation={[-0.262, 0, 0]}
                            scale={0.8}
                        >
                            <mesh
                                name="Cylinder010"
                                geometry={nodes.Cylinder010.geometry}
                                // material={materials.green_02}
                            >
                                <ItemMaterialYellowDark
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="Cylinder010_1"
                                geometry={nodes.Cylinder010_1.geometry}
                                // material={materials.green_02}
                            >
                                <ItemMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="gear_01001"
                                geometry={nodes.gear_01001.geometry}
                                // material={materials.green_01}
                                position={[-0.264, -0.152, 0]}
                            >
                                <ItemMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="gear_02001"
                                geometry={nodes.gear_02001.geometry}
                                // material={materials.green_01}
                                position={[0, 0.305, 0]}
                            >
                                <ItemMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="gear_03001"
                                geometry={nodes.gear_03001.geometry}
                                // material={materials.green_01}
                                position={[0.264, -0.152, 0]}
                            >
                                <ItemMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                            <mesh
                                name="gear_04001"
                                geometry={nodes.gear_04001.geometry}
                                // material={materials.green_01}
                            >
                                <ItemMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                                <Outlines opacity={opacity} />
                            </mesh>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Methods);
