import * as THREE from "three";

const red = new THREE.Vector3().setFromColor(new THREE.Color("#FF4800"));
const redDark = new THREE.Vector3().setFromColor(new THREE.Color("#D90000"));
const yellow = new THREE.Vector3().setFromColor(new THREE.Color("#FBE948"));
const yellowDark = new THREE.Vector3().setFromColor(new THREE.Color("#FFC700"));
const violet = new THREE.Vector3().setFromColor(new THREE.Color("#D900FF"));
const violetDark = new THREE.Vector3().setFromColor(new THREE.Color("#AF00F1"));

export const GrainMaterialRed = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uGradientColorA={red}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};

export const GrainMaterialRedDark = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uGradientColorA={redDark}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};
export const GrainMaterialYellow = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uColor={yellow}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};

export const GrainMaterialYellowDark = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uColor={yellowDark}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};
export const GrainMaterialViolet = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uColor={violet}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};

export const GrainMaterialVioletDark = ({ boundingBox }) => {
    return (
        <grainShaderMaterial
            uGradientStop={1}
            uColor={violetDark}
            uBoundingBoxMin={boundingBox.min}
            uBoundingBoxMax={boundingBox.max}
        />
    );
};
