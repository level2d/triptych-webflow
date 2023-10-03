/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { GrainMaterialViolet, GrainMaterialVioletDark } from "../Materials";
import { Outlines } from "../Common";

export default function SkullModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Skull);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.jaw.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "skull_orbit":
                    action.play();
                    break;
                case "jaw":
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
            name="SkullModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="skull">
                    <group name="rotation_null014">
                        <mesh
                            name="skull001"
                            geometry={nodes.skull001.geometry}
                            //   material={materials.green_01}
                            position={[-0.004, -0.114, -0.039]}
                        >
                            <GrainMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                        </mesh>
                        <mesh
                            name="skull002"
                            geometry={nodes.skull002.geometry}
                            //   material={materials.green_01}
                            position={[-0.006, -0.152, 0.2]}
                        >
                            <GrainMaterialViolet
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <Outlines opacity={opacity} />
                            <mesh
                                name="sockets"
                                geometry={nodes.sockets.geometry}
                                // material={materials.green_02}
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

useGLTF.preload(GLB_ASSET_URLS.Skull);
