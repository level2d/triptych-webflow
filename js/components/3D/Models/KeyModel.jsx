/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Outlines } from "../Common";
import { ItemMaterialViolet } from "../Materials";

export default function KeyModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Key);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.key_01?.reset().play();
        actions?.key_02?.reset().play();
        actions?.key_03?.reset().play();
        actions?.key_04?.reset().play();
        actions?.key_05?.reset().play();
        actions?.key_06?.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "key_orbit":
                    action.play();
                    break;
                case "key_01":
                case "key_02":
                case "key_03":
                case "key_04":
                case "key_05":
                case "key_06":
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
            name="KeyModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="key">
                    <group name="rotation_null001">
                        <mesh
                            name="key001"
                            geometry={nodes.key001.geometry}
                            // material={materials.green_01}
                            position={[-0.156, -0.34, 0.002]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="key002"
                            geometry={nodes.key002.geometry}
                            // material={nodes.key002.material}
                            position={[0.201, 0.316, 0.003]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="key003"
                            geometry={nodes.key003.geometry}
                            // material={nodes.key003.material}
                            position={[-0.353, -0.308, 0.002]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="key004"
                            geometry={nodes.key004.geometry}
                            // material={nodes.key004.material}
                            position={[0.357, 0.274, 0.006]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="key005"
                            geometry={nodes.key005.geometry}
                            material={nodes.key005.material}
                            position={[0.472, 0.336, 0.007]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="key006"
                            geometry={nodes.key006.geometry}
                            // material={nodes.key006.material}
                            position={[-0.34, -0.517, 0.002]}
                        >
                            <ItemMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.Key);
