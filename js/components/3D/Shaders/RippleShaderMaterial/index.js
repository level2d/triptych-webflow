import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShaderCode from "./vertex.glsl";
import fragmentShaderCode from "./fragment.glsl";

export const RippleShaderMaterial = shaderMaterial(
    // Uniform
    {
        time: 1.0,
        opacity: 1.0,
        uMouse: new THREE.Vector2(0,0),
        uPerlinEnabled: true,
        uPerlinResolution: 1,
        uPerlinSpeed: 0.1,
        uPerlinYScale: 1.0,
        uPerlinMultiplier: 1.5,
        uDisplacement: null,
        // color clamp pass
        uClampColorEnabled: true,
        uClampColorMin: new THREE.Vector3(0, 0, 0),
        uClampColorMax: new THREE.Vector3(1, 1, 1),
        uRadius: 0.3,
        uAmplitude: 2.0,
        uPeriod: 0.4,
        uPhaseShift: 0.1,
    },
    // Vertex Shader
    `${vertexShaderCode}`,
    // Fragment Shader
    `${fragmentShaderCode}`,
);

extend({ RippleShaderMaterial });
