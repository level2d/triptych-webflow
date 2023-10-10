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
uniform bool uPerlinEnabled;
uniform float uPerlinResolution;
uniform float uPerlinYScale;
uniform float uPerlinSpeed;
uniform float uPerlinLightenFactor;
uniform sampler2D uMatcapTexture;
uniform float uNoiseScale;
uniform vec3 uGradientColorA;
uniform vec3 uGradientColorB;
uniform float uGradientStop;
uniform bool uMatcapEnabled;
uniform bool uGradientEnabled;
uniform bool uNoiseEnabled;
uniform float uNoiseContrast;
uniform float uNoiseScalarDistanceFactor;
uniform bool uClampColorEnabled;
uniform vec3 uClampColorMin;
uniform vec3 uClampColorMax;
uniform float opacity;

varying vec2 vScreenSpace;
varying vec2 vUv;
varying vec3 vEye;
varying vec3 vN;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return clamp(42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))), 0.0, 1.0);
}

vec3 perlin() {
    vec2 scale = vec2(1.0, uPerlinYScale);
    vec2 position = vScreenSpace * (uPerlinResolution * scale);
    vec3 color = vec3(1.0);
    vec3 c = vec3(0.0);

    c += color * snoise(vec3(position, time * uPerlinSpeed));

    return c;
}

vec3 matcap() {
    vec3 r = reflect(vEye, vN);
    float m = 2. * sqrt(pow(r.x, 2.) + pow(r.y, 2.) + pow(r.z + 1., 2.));
    vec2 vN = r.xy / m + .5;

    vec3 color = texture2D(uMatcapTexture, vN).rgb;

    return color;
}

vec3 gradient() {
    float stop0 = smoothstep(vUv.y, 0.0, uGradientStop);

    vec3 color = mix(uGradientColorA, uGradientColorB, stop0);

    return color;
}

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
                vec3 r = g + (0.5 + 0.5 * sin(vec3(time) + 6.2831 * o)) - f;
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

    vec2 st = vScreenSpace * vec2(uNoiseScale);
    vec2 res = voronoi(vec3(st * 3.0, 0.0), 0.0);
    // darken by pow
    vec3 color = vec3(pow(res.x, uNoiseContrast));

    return color;
}

vec3 colorClamp(vec3 color) {
    return color = clamp(color, uClampColorMin, uClampColorMax);
}

void main() {
    vec3 perlinColor = perlin();
    vec3 matcapColor = matcap();
    vec3 gradientColor = gradient();
    vec3 noiseColor = noise();

    // set a default color in case everything is turned off
    vec3 color = vec3(0, 0, 0);

    if(uPerlinEnabled) {
        color += clamp(perlinColor, vec3(uPerlinLightenFactor), vec3(1.0));
    }

    if(uMatcapEnabled) {
        color += color * matcapColor;
    }

    if(uGradientEnabled) {
        color = color * gradientColor;
    }

    if(uNoiseEnabled) {
        color += color * noiseColor;
    }

    if(uClampColorEnabled) {
        color = colorClamp(color);
    }

    gl_FragColor = vec4(color, opacity);
}