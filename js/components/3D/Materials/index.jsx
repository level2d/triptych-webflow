import * as THREE from "three";
import { useControls, folder } from "leva";
import { useRef } from "react";
import { RippleShaderMaterial } from "../Shaders";
import { useFrame } from "@react-three/fiber";

export const RippleMaterial = ({ opacity = 1 }) => {
    const shaderRef = useRef();
    const time = useRef(1.0);
    const mousePos = useRef(new THREE.Vector2());

    const {
        uPerlinEnabled,
        uPerlinResolution,
        uPerlinYScale,
        uPerlinSpeed,
        uPerlinMultiplier,
        uClampColorEnabled,
        uClampColorMax,
        uClampColorMin,
        uRadius,
        uAmplitude,
        uPeriod,
        uPhaseShift,
    } = useControls({
        "Ripple Shader": folder({
            Perlin: folder({
                uPerlinEnabled: true,
                uPerlinResolution: {
                    value: 11,
                    min: 1,
                    max: 50,
                    step: 1,
                },
                uPerlinYScale: {
                    value: 7,
                    min: 1.0,
                    max: 50.0,
                    step: 1.0,
                },
                uPerlinSpeed: {
                    value: 0.4,
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                },
                uPerlinMultiplier: {
                    value: 0.65,
                    min: 0.1,
                    max: 3,
                    step: 0.01,
                },
            }),
            Cursor: folder({
                uRadius: {
                    value: 1.0,
                    min: 0,
                    max: 1,
                    step: 0.1,
                },
                uAmplitude: {
                    value: 1.4,
                    min: 0,
                    max: 10,
                    step: 0.2,
                },
                uPeriod: {
                    value: 20,
                    min: 0,
                    max: 100,
                    step: 5,
                },
                uPhaseShift: {
                    value: 5,
                    min: 0,
                    max: 100,
                    step: 5,
                },
            }),
            ColorClamp: folder({
                uClampColorEnabled: true,
                uClampColorMin: {
                    value: {
                        r: 57,
                        g: 57,
                        b: 57,
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

    useFrame(({ clock, pointer }) => {
        time.current = clock.getElapsedTime();
        shaderRef.current.uniforms.time.value = time.current;
        mousePos.current.x = pointer.x;
        mousePos.current.y = pointer.y;
        shaderRef.current.uniforms.uMouse.value = mousePos.current;
    });

    return (
        <rippleShaderMaterial
            uPerlinEnabled={uPerlinEnabled}
            uPerlinResolution={uPerlinResolution}
            uPerlinSpeed={uPerlinSpeed}
            uPerlinYScale={uPerlinYScale}
            uPerlinMultiplier={uPerlinMultiplier}
            uClampColorEnabled={uClampColorEnabled}
            uClampColorMax={uClampColorMax}
            uClampColorMin={uClampColorMin}
            uDisplacement={null}
            uRadius={uRadius}
            uAmplitude={uAmplitude}
            uPeriod={uPeriod}
            uPhaseShift={uPhaseShift}
            ref={shaderRef}
            key={RippleShaderMaterial.key}
            opacity={opacity}
            transparent
        />
    );
};
