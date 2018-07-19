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

uniform vec3 uAmbientColor;
uniform vec3 uDiffuseColor;
uniform vec3 uSpecularColor;

uniform float uGlossiness;

varying vec3 vNormal;
varying vec3 vPosition;

#ifdef PHONG_TEXTURE
varying vec2 vUV;
#endif

#ifdef PHONG_AMBIENT_TEXTURE
uniform sampler2D uAmbientTexture;
#endif

#ifdef PHONG_DIFFUSE_TEXTURE
uniform sampler2D uDiffuseTexture;
#endif

#ifdef PHONG_SPECULAR_TEXTURE
uniform sampler2D uSpecularTexture;
#endif

#ifdef PHONG_SPECULAR_ENV_MAP_TEXTURE
uniform sampler2D uSpecularEnvMapTexture;
#endif

#ifdef CAST_SHADOW
uniform mat4 uShadowPMatrix;
uniform mat4 uShadowVMatrix;
uniform sampler2D uShadowMapTexture;
#endif

#ifdef PHONG_SPECULAR_ENV_MAP_TEXTURE
vec2 des2pol(vec3 pos){
    float r = distance(vec2(pos.x, pos.z), vec2(0.0));
    float beta = atan(pos.y, r);
    float v = beta / PI + 0.5;
    float alpha = atan(pos.x, pos.z);
    float u = alpha / (PI * 2.0) + 0.5;
    return vec2(u, v);
}
#endif

vec3 applyLights(vec3 ambientColorSource, vec3 diffuseColorSource, vec3 specularColorSource){
    vec3 colorLighted = vec3(0.0);

    vec3 nNormal = normalize(vNormal);
    vec3 nViewDirection = normalize(uCameraPosition - vPosition);

    #ifdef PHONG_SPECULAR_ENV_MAP_TEXTURE
    vec3 viewReflect = reflect(-nViewDirection, nNormal);
    vec2 viewReflectUV = des2pol(viewReflect);
    vec3 envMapFactor = texture2D(uSpecularEnvMapTexture, viewReflectUV).rgb;
    specularColorSource *= envMapFactor;
    #endif

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

        }else if(type == LIGHT_TYPE_POINT){

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

    #ifdef PHONG_AMBIENT_TEXTURE
    vec3 ambient = texture2D(uAmbientTexture, vUV).rgb * uAmbientColor;
    #else
    vec3 ambient = uAmbientColor;
    #endif

    #ifdef PHONG_DIFFUSE_TEXTURE
    vec3 diffuse = texture2D(uDiffuseTexture, vUV).rgb * uDiffuseColor;
    #else
    vec3 diffuse = uDiffuseColor;
    #endif

    #ifdef PHONG_SPECULAR_TEXTURE
    vec3 specular = texture2D(uSpecularTexture, vUV).rgb * uSpecularColor;
    #else
    vec3 specular = uSpecularColor;
    #endif

    gl_FragColor = vec4(applyLights(ambient, diffuse, specular), 1.0);

    #ifdef CAST_SHADOW
    vec4 shadowPosition = uShadowPMatrix * uShadowVMatrix * vec4(vPosition, 1.0);
    vec3 shadowCoord = (shadowPosition.xyz / shadowPosition.w)/2.0 + 0.5;
    float shadowDepth = texture2D(uShadowMapTexture, shadowCoord.xy).r;
    if(shadowCoord.z > shadowDepth + 0.01){
        gl_FragColor = vec4(gl_FragColor.xyz*0.7, 1.0);
    }
    #endif
}