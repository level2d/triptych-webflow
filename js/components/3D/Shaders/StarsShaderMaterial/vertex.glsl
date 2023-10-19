precision highp float;
precision highp int;

varying vec2 vScreenSpace;
varying vec2 vUv;

varying vec3 vEye;
varying vec3 vN;

void main() {
    vUv = uv;

    // Varyings for matcap calculations
    vEye = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
    vN = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vScreenSpace = gl_Position.xy / gl_Position.w;
}