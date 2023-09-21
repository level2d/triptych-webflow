import * as THREE from "three";
import { useControls, folder } from "leva";
import { useRef } from "react";

export const GrainMaterialRed = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};

export const GrainMaterialRedDark = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};
export const GrainMaterialYellow = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};

export const GrainMaterialYellowDark = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};
export const GrainMaterialViolet = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};

export const GrainMaterialVioletDark = ({ boundingBox }) => {
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
                    value: 0.25,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.33,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 193.480485,
                        g: 0,
                        b: 1.385925,
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
                        r: 127.5,
                        g: 0,
                        b: 56.0235,
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
        <grainShaderMaterialB
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
            uNoiseScale={uNoiseScale}
            uNoiseContrast={uNoiseContrast}
            uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
            uGradientStop={uGradientStop}
            uMatcapEnabled={uMatcapEnabled}
            uNoiseEnabled={uNoiseEnabled}
            uGradientEnabled={uGradientEnabled}
            ref={shaderRef}
        />
    );
};
