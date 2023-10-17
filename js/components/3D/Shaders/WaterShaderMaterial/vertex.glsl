precision highp float;
precision highp int;

uniform vec3 uBoundingBoxMin;
uniform vec3 uBoundingBoxMax;

varying vec2 vScreenSpace;
varying vec2 vUv;

varying vec3 vEye;
varying vec3 vN;

void main() {
    vUv = uv;

    // Clamp vUv to bounding box
    vUv.y = (position.y - uBoundingBoxMin.y) / (uBoundingBoxMax.y - uBoundingBoxMin.y);
    vUv.x = (position.x - uBoundingBoxMin.x) / (uBoundingBoxMax.x - uBoundingBoxMin.x);

    // Varyings for matcap calculations
    vEye = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
    vN = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vScreenSpace = gl_Position.xy / gl_Position.w;
}