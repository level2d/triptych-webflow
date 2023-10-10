precision highp float;
precision highp int;

uniform vec3 uBoundingBoxMin;
uniform vec3 uBoundingBoxMax;

varying vec2 vScreenSpace;
varying vec2 vUv;

varying vec3 vEye;
varying vec3 vN;

#ifdef USE_MORPHTARGETS

uniform float morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

uniform float morphTargetInfluences[MORPHTARGETS_COUNT];
uniform sampler2DArray morphTargetsTexture;
uniform ivec2 morphTargetsTextureSize;

vec4 getMorph(const in int vertexIndex, const in int morphTargetIndex, const in int offset) {

    int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
    int y = texelIndex / morphTargetsTextureSize.x;
    int x = texelIndex - y * morphTargetsTextureSize.x;

    ivec3 morphUV = ivec3(x, y, morphTargetIndex);
    return texelFetch(morphTargetsTexture, morphUV, 0);

}

	#else

		#ifndef USE_MORPHNORMALS

uniform float morphTargetInfluences[8];

		#else

uniform float morphTargetInfluences[4];

		#endif

	#endif

#endif

void main() {
    vec3 transformed = vec3(position);
    #ifdef USE_MORPHTARGETS

        // morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
        // When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
        // When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
    transformed *= morphTargetBaseInfluence;

        #ifdef MORPHTARGETS_TEXTURE

    for(int i = 0; i < MORPHTARGETS_COUNT; i++) {

        if(morphTargetInfluences[i] != 0.0)
            transformed += getMorph(gl_VertexID, i, 0).xyz * morphTargetInfluences[i];

    }

        #else

    transformed += morphTarget0 * morphTargetInfluences[0];
    transformed += morphTarget1 * morphTargetInfluences[1];
    transformed += morphTarget2 * morphTargetInfluences[2];
    transformed += morphTarget3 * morphTargetInfluences[3];

            #ifndef USE_MORPHNORMALS

    transformed += morphTarget4 * morphTargetInfluences[4];
    transformed += morphTarget5 * morphTargetInfluences[5];
    transformed += morphTarget6 * morphTargetInfluences[6];
    transformed += morphTarget7 * morphTargetInfluences[7];

            #endif

        #endif

    #endif
    vUv = uv;

    // tweaks for gradient. Clamp vUv to bounding box
    vUv.y = (position.y - uBoundingBoxMin.y) / (uBoundingBoxMax.y - uBoundingBoxMin.y);
    vUv.x = (position.x - uBoundingBoxMin.x) / (uBoundingBoxMax.x - uBoundingBoxMin.x);

    // Varyings for matcap calculations
    vEye = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
    vN = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);

    vScreenSpace = gl_Position.xy / gl_Position.w;
}