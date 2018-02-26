#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

#define LIGHT_MAX_COUNT 16
#define LIGHT_TYPE_NULL 1
#define LIGHT_TYPE_AMBIENT 2
#define LIGHT_TYPE_DIRECTIONAL 3
#define LIGHT_TYPE_POINT 4
#define LIGHT_TYPE_HEMISPHERE 5

#define MATERIAL_TYPE_RAW 1
#define MATERIAL_TYPE_STANDARD 2

uniform vec3 uCameraPosition;

uniform int uLightType[LIGHT_MAX_COUNT];
uniform vec3 uLightColor1[LIGHT_MAX_COUNT];
uniform vec3 uLightColor2[LIGHT_MAX_COUNT];
uniform float uLightIntensity[LIGHT_MAX_COUNT];
uniform vec3 uLightPosition[LIGHT_MAX_COUNT];

uniform int uMaterialType;
uniform float uMaterialOpacity;
uniform vec2 uMaterialOffset;
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

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vPosition;

uniform bool manuallyFlipY;

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
        vec2 viewReflectUV = des2pol(viewReflect);
        vec3 envMapFactor = texture2D(uEnvMapTexture, viewReflectUV).xyz;
        specularColorSource *= envMapFactor;
    }

    for(int i = 0; i < LIGHT_MAX_COUNT; i++){
        int type = uLightType[i];
        if(type == LIGHT_TYPE_DIRECTIONAL){

            vec3 nLightDir = normalize(uLightPosition[i]);

            float factorLambert = max(dot(nNormal, nLightDir), 0.0);
            vec3 diffuseIncrement = factorLambert * uLightColor1[i] * uLightIntensity[i] * diffuseColorSource;
            colorLighted += diffuseIncrement;

            float factorPhong = pow(max(dot(reflect(-nLightDir, nNormal), nViewDirection), 0.0), uGlossiness);
            vec3 specularIncrement = factorPhong * uLightColor1[i] * uLightIntensity[i] * specularColorSource;
            colorLighted += specularIncrement;

        }else if(type ==  LIGHT_TYPE_POINT){

            vec3 ray = uLightPosition[i] - vPosition;
            float rayLen = length(ray);
            float decayedIntensity = 1.0 / (rayLen * rayLen) * uLightIntensity[i];

            vec3 nLightDir = normalize(ray);

            float factorLambert = abs(dot(normalize(vNormal), nLightDir));
            vec3 diffuseIncrement = factorLambert * uLightColor1[i] * decayedIntensity * diffuseColorSource;
            colorLighted += diffuseIncrement;

            float factorPhong = pow(max(dot(reflect(-nLightDir, nNormal), nViewDirection), 0.0), uGlossiness);
            vec3 specularIncrement = factorPhong * uLightColor1[i] * decayedIntensity * specularColorSource;
            colorLighted += specularIncrement;

        }else if(type == LIGHT_TYPE_AMBIENT){

            vec3 increment = uLightColor1[i] * uLightIntensity[i] * ambientColorSource;
            colorLighted += increment;

        }else if(type == LIGHT_TYPE_HEMISPHERE){

            float factor = dot(normalize(vNormal), normalize(uLightPosition[i]));
            vec3 increment = mix(uLightColor2[i], uLightColor1[i], factor * 0.5 + 0.5) * uLightIntensity[i] * diffuseColorSource;
            colorLighted += increment;

        }
    }

    return colorLighted;
}

void main() {

    vec2 offsetedUV = vUV;
    offsetedUV = fract(offsetedUV + uMaterialOffset);
    if(manuallyFlipY){
        offsetedUV.y = 1.0 - offsetedUV.y;
    }

    vec4 diffuseColorSource = uMaterialDiffuseTextureFlag ? texture2D(uDiffuseTexture, offsetedUV) : vec4(uDiffuseColor, 1.0);

    if(uMaterialType == MATERIAL_TYPE_STANDARD){
        vec4 ambientColorSource = uMaterialAmbientTextureFlag ? texture2D(uAmbientTexture, offsetedUV) : vec4(uAmbientColor, 1.0);
        vec4 specularColorSource = uMaterialSpecularTextureFlag ? texture2D(uSpecularTexture, offsetedUV) : vec4(uSpecularColor, 1.0);
        gl_FragColor = vec4(applyLights(ambientColorSource.xyz, diffuseColorSource.xyz, specularColorSource.xyz), uMaterialOpacity);
    }else if(uMaterialType == MATERIAL_TYPE_RAW){
        gl_FragColor = vec4(diffuseColorSource.xyz, uMaterialOpacity);
    }
}