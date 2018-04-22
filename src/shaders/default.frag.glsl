#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

#define LIGHT_MAX_COUNT 16
#define LIGHT_TYPE_NULL 1
#define LIGHT_TYPE_AMBIENT 2
#define LIGHT_TYPE_DIRECTIONAL 3
#define LIGHT_TYPE_POINT 4

#define MATERIAL_TYPE_RAW 1
#define MATERIAL_TYPE_STANDARD 2
#define MATERIAL_TYPE_PBR 3

#define PI 3.1415926

uniform vec3 uCameraPosition;

uniform int uLightType[LIGHT_MAX_COUNT];
uniform vec3 uLightColor[LIGHT_MAX_COUNT];
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


uniform vec3 uMaterialAlbedoColor;
uniform bool uMaterialAlbedoTextureFlag;
uniform sampler2D uMaterialAlbedoTexture;
uniform float uMaterialRoughness;
uniform bool uMaterialMetallicFlag;
uniform vec3 uMaterialBaseReflectivity;

uniform bool uShadowFlag;
uniform sampler2D uShadowMapTexture;
uniform mat4 uShadowPMatrix;
uniform mat4 uShadowVMatrix;
uniform mat4 uMMatrix;

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
            vec3 diffuseIncrement = factorLambert * uLightColor[i] * uLightIntensity[i] * diffuseColorSource;
            colorLighted += diffuseIncrement;

            float factorPhong = pow(max(dot(reflect(-nLightDir, nNormal), nViewDirection), 0.0), uGlossiness);
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



vec3 L(vec3 N, vec3 Wi, vec3 Wo, vec3 c, vec3 F0, float a, vec3 Li){

    vec3 envMapFactor;

    if(uEnvMapFlag){

        vec3 viewReflect = reflect(-Wo, N);

        vec2 viewReflectUV = des2pol(viewReflect);

        envMapFactor = texture2D(uEnvMapTexture, viewReflectUV).xyz;

        envMapFactor = (envMapFactor * 0.5)+0.5;
    }

    float NDotWi = clamp(dot(N, Wi), 0.0, 1.0);
    float NDotWo = clamp(dot(N, Wo), 0.0, 1.0);

    vec3 kf = F0 + (1.0 - F0) * (1.0 - pow(NDotWi, 5.0));
    vec3 kd = 1.0 - kf;

    vec3 diffuse = kd * c / PI;

    vec3 H = (Wi + Wo)/2.0;
    float NDotH = clamp(dot(N, H), 0.0, 1.0);

    float D = (a * a) / max(0.001, PI * pow(NDotH * NDotH * (a * a - 1.0) + 1.0 , 2.0));

    float k = (a + 1.0) * (a + 1.0) / 8.0;

    float G1 = NDotWo / max(0.001, NDotWo * (1.0 - k) + k);
    float G2 = NDotWi / max(0.001, NDotWi * (1.0 - k) + k);
    float G = G1 * G2;
    
    vec3 specular = vec3(D * G1 * G2) * kf / max(0.001, NDotWi * NDotWo * PI * 4.0);

    // diffuse = vec3(0.0);
    // specular = vec3(0.0);

    // return (diffuse + specular) * NDotWi * Li;
    return kd;
}

vec3 pbr(vec3 albedo){

    vec3 fragColor = vec3(0.0, 0.0, 0.0);

    for(int i = 0; i < LIGHT_MAX_COUNT; i++){

        int type = uLightType[i];

        if(type == LIGHT_TYPE_DIRECTIONAL){
            
            vec3 N = normalize(vNormal);
            vec3 Wi = normalize(uLightPosition[i]);
            vec3 Wo = normalize(uCameraPosition - vPosition);

            vec3 F0 = uMaterialMetallicFlag ? uMaterialAlbedoColor : uMaterialBaseReflectivity;
            float a = uMaterialRoughness;
            vec3 c = albedo;
            vec3 Li = uLightColor[i] * uLightIntensity[i];
            
            fragColor += L(N, Wi, Wo, c, F0, a, Li);
        }
    }

    // HDR
    fragColor = fragColor/(fragColor+1.0);

    // Gama Correct
    fragColor = pow(fragColor, vec3(1.0/2.2));

    return fragColor;
}

void main() {

    vec2 offsetedUV = vUV;
    offsetedUV = fract(offsetedUV + uMaterialOffset);
    if(manuallyFlipY){
        offsetedUV.y = 1.0 - offsetedUV.y;
    }

    if(uMaterialType == MATERIAL_TYPE_STANDARD){

        vec4 diffuseColorSource = uMaterialDiffuseTextureFlag ? texture2D(uDiffuseTexture, offsetedUV) : vec4(uDiffuseColor, 1.0);        
        vec4 ambientColorSource = uMaterialAmbientTextureFlag ? texture2D(uAmbientTexture, offsetedUV) : vec4(uAmbientColor, 1.0);
        vec4 specularColorSource = uMaterialSpecularTextureFlag ? texture2D(uSpecularTexture, offsetedUV) : vec4(uSpecularColor, 1.0);
        gl_FragColor = vec4(applyLights(ambientColorSource.xyz, diffuseColorSource.xyz, specularColorSource.xyz), uMaterialOpacity);
        
    }else if(uMaterialType == MATERIAL_TYPE_RAW){

        vec4 diffuseColorSource = uMaterialDiffuseTextureFlag ? texture2D(uDiffuseTexture, offsetedUV) : vec4(uDiffuseColor, 1.0);

        gl_FragColor = vec4(diffuseColorSource.xyz, uMaterialOpacity);

    }else if(uMaterialType == MATERIAL_TYPE_PBR){

        vec3 albedo = uMaterialAlbedoTextureFlag ? texture2D(uMaterialAlbedoTexture, offsetedUV).xyz : uMaterialAlbedoColor;

        gl_FragColor = vec4(pbr(albedo), 1.0);

    }

    if(uShadowFlag){

        vec4 shadowPosition = uShadowPMatrix * uShadowVMatrix * vec4(vPosition, 1.0);

        vec3 shadowCoord = (shadowPosition.xyz / shadowPosition.w)/2.0 + 0.5;

        float shadowDepth = texture2D(uShadowMapTexture, shadowCoord.xy).r;
        if(shadowCoord.z > shadowDepth + 0.001){
            gl_FragColor = vec4(gl_FragColor.xyz*0.7, 1.0);
        }
    }
}