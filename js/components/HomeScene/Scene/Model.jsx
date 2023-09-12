import * as THREE from "three";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useControls, folder } from "leva";

function _Model(props, ref) {
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const grainShaderMaterialRef = useRef();
    const { nodes, materials } = useGLTF(GLB_ASSET_URLS.Locations);
    const { uNoiseScale, uGradientStop, outlineColor, outlineThickness } =
        useControls({
            Outlines: folder({
                outlineColor: "black",
                outlineThickness: {
                    value: 0.03,
                    step: 0.01,
                    min: 0.01,
                    max: 0.1,
                },
            }),
            "Triptych Shader": folder({
                Noise: folder({
                    uNoiseScale: {
                        value: 1000.0,
                        min: 10,
                        max: 2000,
                        step: 10,
                    },
                }),
                Gradient: folder({
                    uGradientStop: {
                        value: 0.25,
                        min: 0.0,
                        max: 0.5,
                        step: 0.01,
                    },
                    uGradientColorA: {
                        value: {
                            r: 255,
                            g: 255,
                            b: 255,
                        },
                        onChange: (v) => {
                            console.log("uGradientColorA:", v);
                            const color = new THREE.Vector3(v.r, v.g, v.b);
                            color.divide(new THREE.Vector3(255, 255, 255));
                            grainShaderMaterialRef.current.uniforms.uGradientColorA.value =
                                color;
                        },
                    },
                    uGradientColorB: {
                        value: {
                            r: 0,
                            g: 0,
                            b: 0,
                        },
                        onChange: (v) => {
                            const color = new THREE.Vector3(v.r, v.g, v.b);
                            color.divide(new THREE.Vector3(255, 255, 255));
                            grainShaderMaterialRef.current.uniforms.uGradientColorB.value =
                                color;
                        },
                    },
                }),
            }),
        });
    useEffect(() => {
        nodes.triptych.geometry.computeBoundingBox();
        setBoundingBox(nodes.triptych.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry]);

    return (
        <group {...props} dispose={null} scale={0.1}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.triptych.geometry}
                // material={nodes.triptych.material}
                ref={ref}
            >
                <grainShaderMaterial
                    uNoiseScale={uNoiseScale}
                    uBoundingBoxMin={boundingBox.min}
                    uBoundingBoxMax={boundingBox.max}
                    uGradientStop={uGradientStop}
                    ref={grainShaderMaterialRef}
                />
                <Outlines thickness={outlineThickness} color={outlineColor} />
            </mesh>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.water.geometry}
                material={nodes.water.material}
            /> */}
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_015.geometry}
                // material={nodes.location_015.material}
                position={[1, 1, -3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_001.geometry}
                // material={nodes.location_001.material}
                position={[1, 3, -3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_002.geometry}
                material={nodes.location_002.material}
                position={[-3, -1, -3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_003.geometry}
                // material={nodes.location_003.material}
                position={[-3, 3, 1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_004.geometry}
                // material={nodes.location_004.material}
                position={[-1, -1, 1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_005.geometry}
                // material={nodes.location_005.material}
                position={[3, -1, 3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_006.geometry}
                // material={nodes.location_006.material}
                position={[-1, -3, 1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_007.geometry}
                // material={nodes.location_007.material}
                position={[1, -1, -1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_008.geometry}
                // material={nodes.location_008.material}
                position={[-1, 3, 3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_009.geometry}
                // material={nodes.location_009.material}
                position={[-3, -3, -3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_010.geometry}
                // material={nodes.location_010.material}
                position={[3, 3, -1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_011.geometry}
                // material={nodes.location_011.material}
                position={[3, -3, -1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_012.geometry}
                // material={nodes.location_012.material}
                position={[1, -3, 1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_013.geometry}
                // material={nodes.location_013.material}
                position={[-1, 1, 1]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                // geometry={nodes.location_014.geometry}
                // material={nodes.location_014.material}
                position={[3, 1, 3]}
                scale={0.35}
            >
                <torusKnotGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
        </group>
    );
}

const Model = forwardRef(_Model);
export default Model;

useGLTF.preload(GLB_ASSET_URLS.Locations);
