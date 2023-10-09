import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useControls, folder } from "leva";
import { useStore } from "@/js/lib/store";

// import { GrainShaderMaterialC } from "../../3D/Shaders";

function ReflectionModel(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const opacity = useStore((state) => state.homeSceneOpacity);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const grainShaderMaterialRef = useRef();
    // const {
    //     uNoiseScale,
    //     uNoiseContrast,
    //     uNoiseScalarDistanceFactor,
    //     uGradientStop,
    //     uMatcapEnabled,
    //     uNoiseEnabled,
    //     uGradientEnabled,
    // } = useControls({
    //     "Reflection Shader": folder({
    //         Matcap: folder({
    //             uMatcapEnabled: true,
    //         }),
    //         Noise: folder({
    //             uNoiseEnabled: true,
    //             uNoiseScale: {
    //                 value: 850,
    //                 min: 10,
    //                 max: 2000,
    //                 step: 10,
    //             },
    //             uNoiseScalarDistanceFactor: {
    //                 value: 0.3,
    //                 min: 0,
    //                 max: 10,
    //                 step: 0.1,
    //             },
    //             uNoiseContrast: {
    //                 value: 1,
    //                 min: 0,
    //                 max: 1,
    //                 step: 0.1,
    //             },
    //         }),
    //         Gradient: folder({
    //             uGradientEnabled: true,
    //             uGradientStop: {
    //                 value: 0.02,
    //                 min: 0.0,
    //                 max: 0.5,
    //                 step: 0.01,
    //             },
    //             uGradientColorA: {
    //                 value: {
    //                     r: 255,
    //                     g: 255,
    //                     b: 255,
    //                 },
    //                 onChange: (v) => {
    //                     const color = new THREE.Vector3(
    //                         v.r,
    //                         v.g,
    //                         v.b,
    //                     ).divideScalar(255);
    //                     grainShaderMaterialRef.current.uniforms.uGradientColorA.value =
    //                         color;
    //                 },
    //             },
    //             uGradientColorB: {
    //                 value: {
    //                     r: 119,
    //                     g: 119,
    //                     b: 119,
    //                 },
    //                 onChange: (v) => {
    //                     const color = new THREE.Vector3(
    //                         v.r,
    //                         v.g,
    //                         v.b,
    //                     ).divideScalar(255);
    //                     grainShaderMaterialRef.current.uniforms.uGradientColorB.value =
    //                         color;
    //                 },
    //             },
    //         }),
    //     }),
    // });

    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    useEffect(() => {
        nodes.triptych.geometry.computeBoundingBox();
        setBoundingBox(nodes.triptych.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry]);

    return (
        <group
            {...props}
            dispose={null}
            scale={[1, -1, 1]}
            position={[0, -11, 0]}
        >
            <mesh
                name="ReflectionModel"
                geometry={nodes.triptych.geometry}
                // material={nodes.triptych.material}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/* <grainShaderMaterial
                    uNoiseEnabled={uNoiseEnabled}
                    uNoiseScale={uNoiseScale}
                    uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
                    uNoiseContrast={uNoiseContrast}
                    uBoundingBoxMin={boundingBox.min}
                    uBoundingBoxMax={boundingBox.max}
                    uGradientStop={uGradientStop}
                    uMatcapEnabled={uMatcapEnabled}
                    uGradientEnabled={uGradientEnabled}
                    ref={grainShaderMaterialRef}
                    key={GrainShaderMaterial.key}
                    opacity={opacity}
                    transparent
                /> */}
                <grainShaderMaterialC />
            </mesh>
        </group>
    );
}

export default ReflectionModel;

useGLTF.preload(GLB_ASSET_URLS.Locations);
