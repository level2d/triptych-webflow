import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShaderCode from "./vertex.glsl";
import fragmentShaderCode from "./fragment.glsl";

export const StarsShaderMaterial = shaderMaterial(
    // Uniform
    {
        time: 1.0,
        opacity: 1.0,
        // noise pass
        uNoiseEnabled: true,
        uNoiseScale: 1000.0,
        uNoiseContrast: 1.5,
        uNoiseScalarDistanceFactor: 1.5,
        uNoiseMultiplier: 1,
        // color clamp pass
        uClampColorEnabled: true,
        uClampColorMin: new THREE.Vector3(0, 0, 0),
        uClampColorMax: new THREE.Vector3(1, 1, 1),
    },
    // Vertex Shader
    `${vertexShaderCode}`,
    // Fragment Shader
    `${fragmentShaderCode}`,
);

extend({ StarsShaderMaterial });
