precision highp float;

#define PI 3.1415926

#define LIGHT_MAX_COUNT 16
#define LIGHT_TYPE_NULL 1
#define LIGHT_TYPE_AMBIENT 2
#define LIGHT_TYPE_DIRECTIONAL 3
#define LIGHT_TYPE_POINT 4

#define PI 3.1415926

uniform vec3 uCameraPosition;

uniform int uLightType[LIGHT_MAX_COUNT];
uniform vec3 uLightColor[LIGHT_MAX_COUNT];
uniform float uLightIntensity[LIGHT_MAX_COUNT];
uniform vec3 uLightPosition[LIGHT_MAX_COUNT];

uniform float uMaterialOpacity;
uniform bool uMaterialAmbientTextureFlag;
uniform bool uMaterialDiffuseTextureFlag;
uniform bool uMaterialSpecularTextureFlag;
uniform vec3 uAmbientColor;
uniform vec3 uDiffuseColor;
uniform vec3 uSpecularColor;
uniform sampler2D uAmbientTexture;
uniform sampler2D uDiffuseTexture;
uniform sampler2D uSpecularTexture;
uniform float uGlossiness;

uniform bool uEnvMapFlag;
uniform sampler2D uEnvMapTexture;

uniform bool uShadowFlag;
uniform sampler2D uShadowMapTexture;
uniform mat4 uShadowPMatrix;
uniform mat4 uShadowVMatrix;
uniform mat4 uMMatrix;

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vPosition;

#include <./uniforms/manually-flip-y.frag.glsl>

vec2 des2pol(vec3 pos){
    float r = distance(vec2(pos.x, pos.z), vec2(0.0));
    float beta = atan(pos.y, r);
    float v = beta / PI + 0.5;
    float alpha = atan(pos.x, pos.z);
    float u = alpha / (PI * 2.0) + 0.5;
    return vec2(u, v);
}

vec3 applyLights(vec3 ambientColorSource, vec3 diffuseColorSource, vec3 specularColorSource){
    vec3 colorLighted = vec3(0.0);

    vec3 nNormal = normalize(vNormal);
    vec3 nViewDirection = normalize(uCameraPosition - vPosition);

    if(uEnvMapFlag){
        
        vec3 viewReflect = reflect(-nViewDirection, nNormal);

        vec3 envMapFactor;

        vec2 viewReflectUV = des2pol(viewReflect);

        envMapFactor = texture2D(uEnvMapTexture, viewReflectUV).xyz;

        specularColorSource *= envMapFactor;
    }

    for(int i = 0; i < LIGHT_MAX_COUNT; i++){

        int type = uLightType[i];

        if(type == LIGHT_TYPE_DIRECTIONAL){

            vec3 nLightDir = normalize(uLightPosition[i]);

            float factorLambert = max(dot(nNormal, nLightDir), 0.0);
            vec3 diffuseIncrement = factorLambert * uLightColor[i] * uLightIntensity[i] * diffuseColorSource;
            colorLighted += diffuseIncrement;

            float factorPhong = pow(max(dot(reflect(-nLightDir, nNormal), nViewDirection), 0.01), uGlossiness);
            vec3 specularIncrement = factorPhong * uLightColor[i] * uLightIntensity[i] * specularColorSource;
            colorLighted += specularIncrement;

        }else if(type ==  LIGHT_TYPE_POINT){

            vec3 ray = uLightPosition[i] - vPosition;
            float rayLen = length(ray);
            float decayedIntensity = 1.0 / (rayLen * rayLen) * uLightIntensity[i];

            vec3 nLightDir = normalize(ray);

            float factorLambert = abs(dot(normalize(vNormal), nLightDir));
            vec3 diffuseIncrement = factorLambert * uLightColor[i] * decayedIntensity * diffuseColorSource;
            colorLighted += diffuseIncrement;

            float factorPhong = pow(max(dot(reflect(-nLightDir, nNormal), nViewDirection), 0.0), uGlossiness);
            vec3 specularIncrement = factorPhong * uLightColor[i] * decayedIntensity * specularColorSource;
            colorLighted += specularIncrement;

        }else if(type == LIGHT_TYPE_AMBIENT){

            vec3 increment = uLightColor[i] * uLightIntensity[i] * ambientColorSource;
            colorLighted += increment;

        }
    }

    return colorLighted;
}




void main() {

    vec2 uv = vUV;

    vec4 ambientColorSource = uMaterialAmbientTextureFlag ? texture2D(uAmbientTexture, vUV) : vec4(uAmbientColor, 1.0);
    vec4 specularColorSource = uMaterialSpecularTextureFlag ? texture2D(uSpecularTexture, vUV) : vec4(uSpecularColor, 1.0);

    #include <./snippets/manually-flip-y.frag.glsl>


    vec4 diffuseColorSource = uMaterialDiffuseTextureFlag ? texture2D(uDiffuseTexture, vUV) : vec4(uDiffuseColor, 1.0);

    gl_FragColor = vec4(applyLights(ambientColorSource.xyz, diffuseColorSource.xyz, specularColorSource.xyz), uMaterialOpacity);

    if(uShadowFlag){

        vec4 shadowPosition = uShadowPMatrix * uShadowVMatrix * vec4(vPosition, 1.0);

        vec3 shadowCoord = (shadowPosition.xyz / shadowPosition.w)/2.0 + 0.5;

        float shadowDepth = texture2D(uShadowMapTexture, shadowCoord.xy).r;
        if(shadowCoord.z > shadowDepth + 0.001){
            gl_FragColor = vec4(gl_FragColor.xyz*0.7, 1.0);
        }
    }
}