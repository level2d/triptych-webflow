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
} from "@/js/components/3D/Materials";

export default function CdmModel({ opacity = 1, ...props }) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.CDM);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.gasket_01.reset().play();
        actions?.gasket_02.reset().play();
        actions?.joystick_01.reset().play();
        actions?.joystick_02.reset().play();
    }, [actions]);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "cdm_orbit":
                    action.play();
                    break;
                case "gasket_01":
                case "gasket_02":
                case "joystick_01":
                case "joystick_02":
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
        <group ref={group} {...props} dispose={null} onClick={handleClick}>
            <group name="Scene">
                <group name="cdm">
                    <group name="rotation_null006">
                        <mesh
                            name="base"
                            geometry={nodes.base.geometry}
                            //   material={materials.green_01}
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <GrainMaterialYellow
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                            <mesh
                                name="joystick"
                                castShadow
                                receiveShadow
                                geometry={nodes.joystick.geometry}
                                // material={materials.green_01}
                                position={[0, 0.075, 0.02]}
                            >
                                <GrainMaterialYellow
                                    opacity={opacity}
                                    boundingBox={boundingBox}
                                />
                            </mesh>
                            <mesh
                                name="joystick_outline"
                                castShadow
                                receiveShadow
                                geometry={nodes.joystick_outline.geometry}
                                // material={materials.outline}
                                position={[0, 0.075, 0.02]}
                            >
                                <OutlineMaterial opacity={opacity} />
                            </mesh>
                        </mesh>
                        <mesh
                            name="base_outline"
                            geometry={nodes.base_outline.geometry}
                            //   material={materials.outline}
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <OutlineMaterial opacity={opacity} />
                        </mesh>
                        <mesh
                            name="gasket"
                            geometry={nodes.gasket.geometry}
                            //   material={materials.green_02}
                            morphTargetDictionary={
                                nodes.gasket.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.gasket.morphTargetInfluences
                            }
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <GrainMaterialYellowDark
                                opacity={opacity}
                                boundingBox={boundingBox}
                            />
                        </mesh>
                        <mesh
                            name="gasket_outline"
                            geometry={nodes.gasket_outline.geometry}
                            //   material={materials.outline}
                            morphTargetDictionary={
                                nodes.gasket_outline.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.gasket_outline.morphTargetInfluences
                            }
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <OutlineMaterial opacity={opacity} />
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.CDM);
