import * as THREE from "three";
import { useControls, folder } from "leva";
import { useRef } from "react";
import {
    ItemShaderMaterial,
    TriptychShaderMaterial,
    ReflectionShaderMaterial,
    StarsShaderMaterial,
    WaterShaderMaterial,
} from "../Shaders";
import * as colors from "@/js/core/colors";
import { useFrame } from "@react-three/fiber";

export const TriptychMaterial = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Triptych Shader": folder({
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
                    value: 0.3,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 1,
                    min: 0,
                    max: 1,
                    step: 0.1,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.04,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 147,
                        g: 147,
                        b: 147,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 23,
                        g: 23,
                        b: 23,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });

    return (
        <triptychShaderMaterial
            uNoiseEnabled={uNoiseEnabled}
            uNoiseScale={uNoiseScale}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uNoiseContrast={uNoiseContrast}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
            key={TriptychShaderMaterial.key}
            opacity={opacity}
            transparent
        />
    );
};

export const ReflectionMaterial = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const time = useRef(1.0);
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
                        shaderRef.current.uniforms.uClampColorMin.value = color;
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
                        shaderRef.current.uniforms.uClampColorMax.value = color;
                    },
                },
            }),
        }),
    });

    useFrame(({ clock }) => {
        time.current = clock.getElapsedTime();
        shaderRef.current.uniforms.time.value = time.current;
    });

    return (
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
            ref={shaderRef}
            key={ReflectionShaderMaterial.key}
            opacity={opacity}
            transparent
        />
    );
};

export const WaterMaterial = ({ opacity = 1 }) => {
    const shaderRef = useRef();
    const time = useRef(1.0);
    const {
        uPerlinEnabled,
        uPerlinResolution,
        uPerlinYScale,
        uPerlinSpeed,
        uPerlinMultiplier,
        uClampColorEnabled,
        uClampColorMax,
        uClampColorMin,
    } = useControls({
        "Water Shader": folder({
            Perlin: folder({
                uPerlinEnabled: true,
                uPerlinResolution: {
                    value: 8,
                    min: 1,
                    max: 50,
                    step: 1,
                },
                uPerlinYScale: {
                    value: 6.0,
                    min: 1.0,
                    max: 50.0,
                    step: 1.0,
                },
                uPerlinSpeed: {
                    value: 0.5,
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                },
                uPerlinMultiplier: {
                    value: 0.7,
                    min: 0.1,
                    max: 5,
                    step: 0.1,
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
                        shaderRef.current.uniforms.uClampColorMin.value = color;
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
                        shaderRef.current.uniforms.uClampColorMax.value = color;
                    },
                },
            }),
        }),
    });

    useFrame(({ clock }) => {
        time.current = clock.getElapsedTime();
        shaderRef.current.uniforms.time.value = time.current;
    });

    return (
        <waterShaderMaterial
            uPerlinEnabled={uPerlinEnabled}
            uPerlinResolution={uPerlinResolution}
            uPerlinSpeed={uPerlinSpeed}
            uPerlinYScale={uPerlinYScale}
            uPerlinMultiplier={uPerlinMultiplier}
            uClampColorEnabled={uClampColorEnabled}
            uClampColorMax={uClampColorMax}
            uClampColorMin={uClampColorMin}
            ref={shaderRef}
            key={WaterShaderMaterial.key}
            opacity={opacity}
            transparent
        />
    );
};
export const StarsMaterial = ({ opacity = 1 }) => {
    const shaderRef = useRef();
    const time = useRef(1.0);
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uNoiseMultiplier,
        uNoiseEnabled,
        uClampColorEnabled,
        uClampColorMax,
        uClampColorMin,
    } = useControls({
        "Stars Shader": folder({
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 100,
                    min: 10,
                    max: 500,
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
                uNoiseMultiplier: {
                    value: 1.5,
                    min: 0,
                    max: 10,
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
                        shaderRef.current.uniforms.uClampColorMin.value = color;
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
                        shaderRef.current.uniforms.uClampColorMax.value = color;
                    },
                },
            }),
        }),
    });

    useFrame(({ clock }) => {
        time.current = clock.getElapsedTime();
        shaderRef.current.uniforms.time.value = time.current;
    });

    return (
        <starsShaderMaterial
            uNoiseEnabled={uNoiseEnabled}
            uNoiseScale={uNoiseScale}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uNoiseContrast={uNoiseContrast}
            uNoiseMultiplier={uNoiseMultiplier}
            uClampColorEnabled={uClampColorEnabled}
            uClampColorMax={uClampColorMax}
            uClampColorMin={uClampColorMin}
            ref={shaderRef}
            key={StarsShaderMaterial.key}
            opacity={opacity}
            transparent
        />
    );
};

export const ItemMaterialRed = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Red Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 217,
                        g: 0,
                        b: 33,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 255,
                        g: 105,
                        b: 0,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};

export const ItemMaterialRedDark = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Red Dark Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 217,
                        g: 0,
                        b: 73,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 255,
                        g: 57,
                        b: 0,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};
export const ItemMaterialYellow = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Yellow Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 255,
                        g: 124,
                        b: 0,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 251,
                        g: 233,
                        b: 72,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};

export const ItemMaterialYellowDark = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Yellow Dark Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 255,
                        g: 67,
                        b: 0,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 250,
                        g: 159,
                        b: 72,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};
export const ItemMaterialViolet = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Violet Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 103,
                        g: 0,
                        b: 242,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 217,
                        g: 0,
                        b: 255,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};

export const ItemMaterialVioletDark = ({ boundingBox, opacity = 1 }) => {
    const shaderRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        "Violet Dark Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 320,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 0.15,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.4,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 67,
                        g: 0,
                        b: 242,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 128,
                        g: 0,
                        b: 255,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        shaderRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    return (
        <itemShaderMaterial
            key={ItemShaderMaterial.key}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            opacity={opacity}
            transparent
            ref={shaderRef}
        />
    );
};

export const OutlineMaterial = ({ opacity = 1 }) => {
    return (
        <meshBasicMaterial
            color={colors.black2}
            transparent
            opacity={opacity}
        />
    );
};
