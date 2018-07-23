precision highp float;

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

varying vec3 vPosition;
varying vec3 vNormal;

#ifdef PBR_NORMAL_TEXTURE
attribute vec2 aNormalUV;
varying vec2 vNormalUV;
#endif

#ifdef PBR_ALBEDO_TEXTURE
attribute vec2 aAlbedoUV;
varying vec2 vAlbedoUV;
#endif

#ifdef PBR_METALLIC_ROUGHNESS_TEXTURE
attribute vec2 aMetallicRoughnessUV;
varying vec2 vMetallicRoughnessUV;
#endif

#ifdef PBR_EMISSIVE_TEXTURE
attribute vec2 aEmissiveUV;
varying vec2 vEmissiveUV;
#endif

void main() {

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);

    vPosition = (uMMatrix * vec4(aPosition, 1.0)).xyz;
    vNormal = normalize((uMMatrix * vec4( aNormal, 0.0)).xyz);

    #ifdef PBR_ALBEDO_TEXTURE
    vAlbedoUV = aAlbedoUV;
    #endif

    #ifdef PBR_METALLIC_ROUGHNESS_TEXTURE
    vMetallicRoughnessUV = aMetallicRoughnessUV;
    #endif

    #ifdef PBR_EMISSIVE_TEXTURE
    vEmissiveUV = aEmissiveUV;
    #endif


    #ifdef PBR_NORMAL_TEXTURE
    vNormalUV = aNormalUV;
    #endif
}