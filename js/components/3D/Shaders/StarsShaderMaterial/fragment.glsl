// Perlin shader
// https://shaderfrog.com/app/view/50

// Matcap shader
// @see: https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader/

// Gradient shader
// @see: https://stackoverflow.com/questions/52614371/apply-color-gradient-to-material-on-mesh-three-js

// Noise shader
// @see: https://github.com/franky-adl/voronoi-sphere
// @see: https://medium.com/geekculture/make-a-cool-plasma-ball-using-voronoi-effect-in-three-js-8a0477e3b745

precision highp float;
precision highp int;

uniform float time;
uniform float opacity;
uniform float uNoiseScale;
uniform bool uNoiseEnabled;
uniform float uNoiseContrast;
uniform float uNoiseScalarDistanceFactor;
uniform float uNoiseSpeed;
uniform float uNoiseMultiplier;
uniform bool uClampColorEnabled;
uniform vec3 uClampColorMin;
uniform vec3 uClampColorMax;

varying vec2 vScreenSpace;
varying vec2 vUv;
varying vec3 vEye;
varying vec3 vN;

// hash function from https://github.com/MaxBittker/glsl-voronoi-noise
vec3 hash3d(vec3 p) {
    return fract(sin(vec3(dot(p, vec3(1.0, 57.0, 113.0)), dot(p, vec3(57.0, 113.0, 1.0)), dot(p, vec3(113.0, 1.0, 57.0)))) *
        43758.5453);
}

// voronoi implementation largely referenced from https://www.shadertoy.com/view/MslGD8
vec2 voronoi(in vec3 x, in float time) {
    // current cell coordinates
    vec3 n = floor(x);
    // pixel coordinates in current cell
    vec3 f = fract(x);

    // initialize m with a large number
    // (which will be get replaced very soon with smaller distances below)
    vec4 m = vec4(8.0);

    // in 2D voronoi, we only have 2 dimensions to loop over
    // in 3D, we would naturally have one more dimension to loop over
    for(int k = -1; k <= 1; k++) {
        for(int j = -1; j <= 1; j++) {
            for(int i = -1; i <= 1; i++) {
                // coordinates for the relative cell  within the 3x3x3 3D grid
                vec3 g = vec3(float(i), float(j), float(k));
                // calculate a random point within the cell relative to 'n'(current cell coordinates)
                vec3 o = hash3d(n + g);
                // calculate the distance vector between the current pixel and the moving random point 'o'
                vec3 r = g + (0.5 + 0.5 * sin(vec3(1.0, 1.0, time * uNoiseSpeed) + 6.2831 * o)) - f;
                // calculate the scalar distance of r
                float d = dot(r, r) * uNoiseScalarDistanceFactor;

                // find the minimum distance
                // it is most important to save the minimum distance into the result 'm'
                // saving other information into 'm' is optional and up to your liking
                // e.g. displaying different colors according to various cell coordinates
                if(d < m.x) {
                    m = vec4(d, o);
                }
            }
        }
    }

    return vec2(m.x, m.y + m.z + m.w);
}

vec3 noise() {

    vec2 st = vUv * vec2(uNoiseScale);
    vec2 res = voronoi(vec3(st * 3.0, 0.0), time);
    // darken by pow
    vec3 color = vec3(pow(res.x, uNoiseContrast));

    return color;
}

vec3 colorClamp(vec3 color) {
    return color = clamp(color, uClampColorMin, uClampColorMax);
}

void main() {
    vec3 noiseColor = noise();

    // set a default color in case everything is turned off
    vec3 color = vec3(0, 0, 0);

    if(uNoiseEnabled) {
        color += noiseColor;
        color = color * vec3(uNoiseMultiplier);
        color = round(color);
        color = vec3(1.0) - color;
    }

    if(uClampColorEnabled) {
        color = colorClamp(color);
    }

    gl_FragColor = vec4(color, opacity);
}