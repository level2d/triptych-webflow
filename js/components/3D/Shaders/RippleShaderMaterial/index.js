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
        uPerlinMultiplier: 0.7,
        // color clamp pass
        uClampColorEnabled: true,
        uClampColorMin: new THREE.Vector3(0, 0, 0),
        uClampColorMax: new THREE.Vector3(1, 1, 1),
       uRadius: 0.5,
        uAmplitude: 0.4,
        uPeriod: 20.0,
        uPhaseShift: 5.0
    },
    // Vertex Shader
    `${vertexShaderCode}`,
    // Fragment Shader
    `${fragmentShaderCode}`,
);

extend({ RippleShaderMaterial });
