/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { GrainMaterialViolet, GrainMaterialVioletDark } from "../Materials";
import { Outlines } from "../Common";

export default function GyroModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Gyro);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.stumble.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "gyro_orbit":
                case "axis":
                    action.play();
                    break;
                case "stumble":
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
            name="GyroModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="gyro">
                    <group name="rotation_null009">
                        <mesh
                            name="gyro001"
                            castShadow
                            receiveShadow
                            geometry={nodes.gyro001.geometry}
                            //   material={materials.green_01}
                            position={[0, -0.657, 0.001]}
                            rotation={[0.028, -0.08, -0.015]}
                        >
                            <GrainMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                            <mesh
                                name="axis"
                                castShadow
                                receiveShadow
                                geometry={nodes.axis.geometry}
                                // material={materials.green_02}
                                position={[0.002, 0.656, 0]}
                                rotation={[0, -0.585, 0]}
                            >
                                <GrainMaterialVioletDark
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

useGLTF.preload(GLB_ASSET_URLS.Gyro);
