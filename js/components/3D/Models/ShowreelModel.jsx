/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLB_ASSET_URLS } from "@/js/core/constants";
import { GrainMaterialYellow, GrainMaterialYellowDark } from "../Materials";
import { Outlines } from "../Common";

export default function ShowreelModel(props) {
    const [mounted, setMounted] = useState(false);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const group = useRef();
    const { nodes, animations } = useGLTF(GLB_ASSET_URLS.Showreel);
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
        if (!mounted) return;
        if (Object.keys(actions).length === 0) return;
        names.forEach((name) => {
            const action = actions[name];
            switch (name) {
                case "showreel_orbit":
                    action.play();
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
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="showreel">
                    <group name="rotation_null007">
                        <mesh
                            name="tv005"
                            castShadow
                            receiveShadow
                            geometry={nodes.tv005.geometry}
                            // material={nodes.tv005.material}
                            position={[0.002, 0.037, 0.033]}
                            rotation={[0, -0.262, 0]}
                            scale={0.908}
                        >
                            <GrainMaterialYellow boundingBox={boundingBox} />
                            <Outlines />
                            <mesh
                                name="bezel"
                                castShadow
                                receiveShadow
                                geometry={nodes.bezel.geometry}
                                // material={nodes.bezel.material}
                            >
                                <GrainMaterialYellowDark
                                    boundingBox={boundingBox}
                                />
                                <Outlines />
                            </mesh>
                            <mesh
                                name="tv003"
                                castShadow
                                receiveShadow
                                geometry={nodes.tv003.geometry}
                                // material={nodes.tv003.material}
                                position={[0, 0.092, 0.242]}
                                scale={1.209}
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

useGLTF.preload(GLB_ASSET_URLS.Showreel);
