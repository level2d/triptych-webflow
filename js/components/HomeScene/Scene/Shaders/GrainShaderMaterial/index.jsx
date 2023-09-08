import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShaderCode from "./vertex.glsl";
import fragmentShaderCode from "./fragment.glsl";

export const GrainShaderMaterial = shaderMaterial(
    // Uniform
    { uHeight: 10.0, uPatternScale: { x: 0.1, y: 0.1 } },
    // Vertex Shader
    vertexShaderCode,
    // Fragment Shader
    fragmentShaderCode,
);

extend({ GrainShaderMaterial });
