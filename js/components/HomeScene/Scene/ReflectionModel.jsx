import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useControls, folder } from "leva";
import { useStore } from "@/js/lib/store";

import { ReflectionShaderMaterial } from "../../3D/Shaders";
import { useFrame } from "@react-three/fiber";

function ReflectionModel(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const meshRef = useRef(null);
    const grainShaderMaterialRef = useRef();
    const time = useRef(1.0);
    const opacity = useStore((state) => state.homeSceneOpacity);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const {
        uPerlinEnabled,
        uPerlinResolution,
        uPerlinYScale,
        uPerlinSpeed,
        uPerlinLightenFactor,
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
        uClampColorEnabled,
        uClampColorMax,
        uClampColorMin,
    } = useControls({
        "Reflection Shader": folder({
            Perlin: folder({
                uPerlinEnabled: true,
                uPerlinResolution: {
                    value: 8,
                    min: 1,
                    max: 50,
                    step: 1,
                },
                uPerlinLightenFactor: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    step: 0.1,
                },
                uPerlinYScale: {
                    value: 6.0,
                    min: 1.0,
                    max: 10.0,
                    step: 1.0,
                },
                uPerlinSpeed: {
                    value: 0.5,
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                },
            }),
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 850,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.9,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 1.0,
                    min: 0,
                    max: 1,
                    step: 0.1,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.21,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
            }),
            ColorClamp: folder({
                uClampColorEnabled: true,
                uClampColorMin: {
                    value: {
                        r: 52,
                        g: 52,
                        b: 52,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        grainShaderMaterialRef.current.uniforms.uClampColorMin.value =
                            color;
                    },
                },
                uClampColorMax: {
                    value: {
                        r: 255,
                        g: 255,
                        b: 255,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        grainShaderMaterialRef.current.uniforms.uClampColorMax.value =
                            color;
                    },
                },
            }),
        }),
    });

    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    useFrame(({ clock }) => {
        time.current = clock.getElapsedTime();
        grainShaderMaterialRef.current.uniforms.time.value = time.current;
    });

    useLayoutEffect(() => {
        meshRef.current.geometry.computeBoundingBox();
        setBoundingBox(meshRef.current.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry, boundingBox]);

    return (
        <group {...props} dispose={null}>
            <mesh
                name="ReflectionModel"
                // material={nodes.water.material}
                geometry={nodes.water.geometry}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={-1}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={meshRef}
            >
                <reflectionShaderMaterial
                    uPerlinEnabled={uPerlinEnabled}
                    uPerlinResolution={uPerlinResolution}
                    uPerlinSpeed={uPerlinSpeed}
                    uPerlinYScale={uPerlinYScale}
                    uPerlinLightenFactor={uPerlinLightenFactor}
                    uNoiseEnabled={uNoiseEnabled}
                    uNoiseScale={uNoiseScale}
                    uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
                    uNoiseContrast={uNoiseContrast}
                    uBoundingBoxMin={boundingBox.min}
                    uBoundingBoxMax={boundingBox.max}
                    uGradientStop={uGradientStop}
                    uMatcapEnabled={uMatcapEnabled}
                    uGradientEnabled={uGradientEnabled}
                    uClampColorEnabled={uClampColorEnabled}
                    uClampColorMax={uClampColorMax}
                    uClampColorMin={uClampColorMin}
                    time={time}
                    ref={grainShaderMaterialRef}
                    key={ReflectionShaderMaterial.key}
                    opacity={opacity}
                    transparent
                />
            </mesh>
        </group>
    );
}

export default ReflectionModel;

useGLTF.preload(GLB_ASSET_URLS.Locations);
