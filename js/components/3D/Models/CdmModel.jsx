/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { Outlines } from "@/js/components/3D/Common";
import { GrainMaterialYellow } from "@/js/components/3D/Materials";

export default function CdmModel(props) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.CDM);
    const { actions, names } = useAnimations(animations, group);

    const handleClick = useCallback(() => {
        actions?.gasket.reset().play();
        actions?.joystick.reset().play();
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
                case "gasket":
                case "joystick":
                    action.clampWhenFinished = false; // stay on last frame
                    action.setLoop(THREE.LoopOnce);
                    action.repetitions = 1;
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
                            name="gasket"
                            castShadow
                            receiveShadow
                            geometry={nodes.gasket.geometry}
                            material={nodes.gasket.material}
                            morphTargetDictionary={
                                nodes.gasket.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.gasket.morphTargetInfluences
                            }
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <GrainMaterialYellow boundingBox={boundingBox} />
                            <Outlines />
                        </mesh>
                        <mesh
                            name="joystick003"
                            castShadow
                            receiveShadow
                            geometry={nodes.joystick003.geometry}
                            material={nodes.joystick003.material}
                            position={[-0.003, -0.265, -0.005]}
                        >
                            <GrainMaterialYellow boundingBox={boundingBox} />
                            <Outlines />
                            <mesh
                                name="joystick001"
                                castShadow
                                receiveShadow
                                geometry={nodes.joystick001.geometry}
                                material={nodes.joystick001.material}
                                position={[0, 0.075, 0.02]}
                            >
                                <GrainMaterialYellow
                                    boundingBox={boundingBox}
                                />
                                <Outlines />
                            </mesh>
                        </mesh>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(GLB_ASSET_URLS.CDM);
