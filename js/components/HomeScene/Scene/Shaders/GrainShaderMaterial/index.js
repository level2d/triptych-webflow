import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShaderCode from "./vertex.glsl";
import fragmentShaderCode from "./fragment.glsl";
import { constants } from "@/js/core";

const textureLoader = new THREE.TextureLoader();
const matcapTexture = await textureLoader.loadAsync(
    constants.TEXTURE_ASSET_URLS.hatching_matcap,
);

export const GrainShaderMaterial = shaderMaterial(
    // Uniform
    {
        // matcap pass
        uMatcapTexture: matcapTexture,
        // color pass
        uBoundingBoxMin: new THREE.Vector3(0, 0, 0),
        uBoundingBoxMax: new THREE.Vector3(1, 1, 1),
        uGradientColorA: new THREE.Vector3(1, 1, 1),
        uGradientColorB: new THREE.Vector3(0, 0, 0),
        uGradientStop: 0.5,
        // noise pass
        uNoiseScale: 1000.0,
    },
    // Vertex Shader
    `${vertexShaderCode}`,
    // Fragment Shader
    `${fragmentShaderCode}`,
);

extend({ GrainShaderMaterial });
