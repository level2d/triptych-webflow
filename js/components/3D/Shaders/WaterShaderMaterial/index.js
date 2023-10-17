import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShaderCode from "./vertex.glsl";
import fragmentShaderCode from "./fragment.glsl";
import { constants } from "@/js/core";

const matcapTexture = new THREE.TextureLoader().load(
    constants.TEXTURE_ASSET_URLS.hatching_matcap,
);

export const WaterShaderMaterial = shaderMaterial(
    // Uniform
    {
        time: 1.0,
        uPerlinEnabled: true,
        uPerlinResolution: 1,
        uPerlinSpeed: 0.1,
        uPerlinYScale: 1.0,
        uPerlinLightenFactor: 0.5,
        // matcap pass
        uMatcapEnabled: true,
        uMatcapTexture: matcapTexture,
        // gradient pass
        uGradientEnabled: true,
        uBoundingBoxMin: new THREE.Vector3(0, 0, 0),
        uBoundingBoxMax: new THREE.Vector3(1, 1, 1),
        uGradientColorA: new THREE.Vector3(1, 1, 1),
        uGradientColorB: new THREE.Vector3(0, 0, 0),
        uGradientStop: 0.5,
        // noise pass
        uNoiseEnabled: true,
        uNoiseScale: 1000.0,
        uNoiseContrast: 1.5,
        uNoiseScalarDistanceFactor: 1.5,
        opacity: 1.0,
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

extend({ WaterShaderMaterial });
