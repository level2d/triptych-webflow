// Matcap shader
// @see: https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader/

// Gradient shader
// @see: https://stackoverflow.com/questions/52614371/apply-color-gradient-to-material-on-mesh-three-js

// Noise shader
// @see: https://shaderfrog.com/app/view/4865

precision highp float;
precision highp int;

uniform sampler2D uMatcapTexture;
uniform vec2 uPatternScale;

varying vec2 vUv;
varying vec3 vEye;
varying vec3 vN;

vec3 matcap() {
    vec3 r = reflect(vEye, vN);
    float m = 2. * sqrt(pow(r.x, 2.) + pow(r.y, 2.) + pow(r.z + 1., 2.));
    vec2 vN = r.xy / m + .5;

    vec3 color = texture2D(uMatcapTexture, vN).rgb;

    return color;
}

vec3 gradient() {
    vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), vUv.y);

    return color;
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

vec3 voronoi(vec2 st) {
        // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimum distance

    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x), float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random2(i_st + neighbor);

            // Animate the point
            // point = 0.5 + 0.5*sin(time + 6.2831*point);

            // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;

            // Distance to the point
            float dist = length(diff);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    vec3 color = vec3(0.0);
    color += m_dist;

    return color;
}

vec3 noise() {
    //vec2 st = gl_FragCoord.xy/uPatternScale;
    vec2 st = vUv.xy / uPatternScale;
    vec3 color = vec3(0.0);

    st *= 3.0;      // Scale up the space by 3
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1
    color = voronoi(vUv.xy / uPatternScale * 3.0);

    return color;
}

void main() {

    vec3 matcapColor = matcap();
    vec3 gradientColor = gradient();
    vec3 noiseColor = noise();

    gl_FragColor = vec4(matcapColor + gradientColor + noiseColor, 1.0);
    // gl_FragColor = vec4(matcapColor + gradientColor, 1.0); // matcap and gradient
    // gl_FragColor = vec4(gradientColor + noiseColor, 1.0); // gradient and grain
    // gl_FragColor = vec4(matcapColor + noiseColor, 1.0); // matcap and grain
    // gl_FragColor = vec4(matcapColor, 1.0); // matcap only
    // gl_FragColor = vec4(gradientColor, 1.0); // gradient only
    // gl_FragColor = vec4(noiseColor, 1.0); // grain only
}