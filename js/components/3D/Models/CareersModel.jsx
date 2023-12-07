/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import ModelOutlines from "@/js/components/3D/Common/ModelOutlines";
import {
    ItemMaterialYellow,
    ItemMaterialYellowDark,
} from "@/js/components/3D/Materials";

export default function CareersModel({ opacity = 1, ...props }) {
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const [mounted, setMounted] = useState(false);
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Careers);
    const { actions, names } = useAnimations(animations, group.current);

    const handleClick = useCallback(() => {
        actions?.fluid.reset().play();
    }, [actions]);

    // setup animations
    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "fluid":
                    action.setLoop(THREE.LoopOnce);
                    break;
                default:
                    break;
            }
        });
    }, [actions, names, mounted]);

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
            name="CareersModel"
            ref={group}
            dispose={null}
            onClick={handleClick}
        >
            <group name="Scene">
                <group name="careers">
                    <group name="rotation_null012" rotation={[0, 1.498, 0]}>
                        <mesh
                            name="mug002"
                            geometry={nodes.mug002.geometry}
                            //   material={materials.green_01}
                            position={[0.026, -0.014, 0.013]}
                            scale={0.8}
                        >
                            <ItemMaterialYellow
                                boundingBox={boundingBox}
                                opacity={opacity}
                            />
                            <ModelOutlines opacity={opacity} />
                            <mesh
                                name="fluid"
                                geometry={nodes.fluid.geometry}
                                // material={materials.green_02}
                                position={[0.01, 0.336, 0.109]}
                                scale={1.054}
                            >
                                <ItemMaterialYellowDark
                                    boundingBox={boundingBox}
                                    opacity={opacity}
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

useGLTF.preload(GLB_ASSET_URLS.Careers);
