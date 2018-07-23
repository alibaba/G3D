#extension GL_EXT_shader_texture_lod: enable
#extension GL_OES_standard_derivatives : enable

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

uniform vec3 uMaterialAlbedoColor;
uniform float uMaterialRoughness;
uniform float uMaterialMetallic;

uniform samplerCube uSpecularMap;
uniform samplerCube uDiffuseMap;
uniform sampler2D uBRDFLUT;
uniform int uSpecularMipLevel;

varying vec3 vPosition;
varying vec3 vNormal;

#ifdef PBR_NORMAL_TEXTURE
varying vec2 vNormalUV;
uniform sampler2D uMaterialNormalTexture;
#endif

#ifdef PBR_ALBEDO_TEXTURE
varying vec2 vAlbedoUV;
uniform sampler2D uMaterialAlbedoTexture;
#endif

#ifdef PBR_METALLIC_ROUGHNESS_TEXTURE
varying vec2 vMetallicRoughnessUV;
uniform sampler2D uMaterialMetallicRoughnessTexture;
#endif

#ifdef PBR_EMISSIVE_TEXTURE
varying vec2 vEmissiveUV;
uniform sampler2D uMaterialEmissiveTexture;
#endif

struct PBRInfo
{
    vec3 N;
    vec3 V;
    vec3 baseColor;
    float roughness;
    float metallic;
};

struct PBRLightInfo
{
    vec3 color;
    vec3 L;
    float intensity;
};

#ifdef PBR_NORMAL_TEXTURE
vec3 getNormal(){
    vec3 pos_dx = dFdx(vPosition);
    vec3 pos_dy = dFdy(vPosition);
    vec3 tex_dx = dFdx(vec3(vNormalUV, 0.0));
    vec3 tex_dy = dFdy(vec3(vNormalUV, 0.0));
    vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);
    vec3 ng = normalize(vNormal);
    t = normalize(t - ng * dot(ng, t));
    vec3 b = normalize(cross(ng, t));
    mat3 tbn = mat3(t, b, ng);
    vec3 n = texture2D(uMaterialNormalTexture, vNormalUV).rgb;
    n = normalize(tbn * ((2.0 * n - 1.0) * vec3(1.0, 1.0, 1.0)));
    return n;
}
#endif

vec3 L_direct(PBRInfo info, PBRLightInfo light){
    
    float NDotL = clamp(dot(info.N, light.L), 0.0, 1.0);
    float NDotV = clamp(dot(info.N, info.V), 0.0, 1.0);

    vec3 F0 = mix(vec3(0.04), info.baseColor, info.metallic);
    vec3 ks = F0 + (1.0 - F0) * pow(1.0 - NDotV, 5.0);
    vec3 kd = 1.0 - ks;
    kd *= 1.0 - info.metallic;

    vec3 diffuse = kd * info.baseColor / PI;

    vec3 H = normalize(light.L + info.V);
    float NDotH = clamp(dot(info.N, H), 0.0, 1.0);

    float roughness = info.roughness;

    float D = (roughness * roughness) / max(0.001, PI * pow(NDotH * NDotH * (roughness * roughness - 1.0) + 1.0 , 2.0));
    
    float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
    float G1 = NDotV / max(0.001, NDotV * (1.0 - k) + k);
    float G2 = NDotL / max(0.001, NDotL * (1.0 - k) + k);
    float G = G1 * G2;

    vec3 specular = vec3(D * G1 * G2) * ks / max(0.001, NDotL * NDotV * PI * 4.0);

    vec3 Li = light.color * light.intensity;

    return (diffuse + specular) * NDotL * Li;
}

vec3 L_env(PBRInfo info){

    float NdotV = clamp(dot(info.N, info.V), 0.0, 1.0);

    vec3 diffuseLight = textureCube(uDiffuseMap, info.N).rgb;
    vec3 diffuseColor = info.baseColor * ( 1.0 - 0.04 ) * ( 1.0 - info.metallic );
    vec3 diffuse = diffuseLight * diffuseColor;

    vec3 R = -normalize(reflect(info.V, info.N));
    vec3 specularLight = textureCubeLodEXT(uSpecularMap, R, info.roughness * float(uSpecularMipLevel)).rgb;

    vec3 specularColor = mix(vec3(0.04), info.baseColor, info.metallic);

    vec2 brdf = texture2D(uBRDFLUT, vec2(NdotV, 1.0 - info.roughness)).rg;

    vec3 specular = specularLight * (specularColor * brdf.x + brdf.y);

    return diffuse + specular;
}

vec3 L(){

    vec3 fragColor = vec3(0.0, 0.0, 0.0);

    PBRInfo pbrInputs = PBRInfo(

        #ifdef PBR_NORMAL_TEXTURE
        getNormal(),
        #else
        vNormal,
        #endif

        normalize(uCameraPosition - vPosition),

        #ifdef PBR_ALBEDO_TEXTURE
        uMaterialAlbedoColor * texture2D(uMaterialAlbedoTexture, vAlbedoUV).rgb,
        #else
        uMaterialAlbedoColor,
        #endif

        #ifdef PBR_METALLIC_ROUGHNESS_TEXTURE
        uMaterialRoughness * texture2D(uMaterialMetallicRoughnessTexture, vMetallicRoughnessUV).g,
        #else
        uMaterialRoughness,
        #endif

        #ifdef PBR_METALLIC_ROUGHNESS_TEXTURE
        uMaterialMetallic * texture2D(uMaterialMetallicRoughnessTexture, vMetallicRoughnessUV).b
        #else
        uMaterialMetallic
        #endif
    );

    for(int i = 0; i < LIGHT_MAX_COUNT; i++){

        int type = uLightType[i];

        if(type == LIGHT_TYPE_DIRECTIONAL){

            fragColor += L_direct(
                pbrInputs,
                PBRLightInfo(
                    uLightColor[i],
                    normalize(uLightPosition[i]),
                    uLightIntensity[i]
                )
            );
        }else if(type == LIGHT_TYPE_POINT){

            float dir = length(uLightPosition[i] - vPosition);

            fragColor += L_direct(
                pbrInputs,
                PBRLightInfo(
                    uLightColor[i],
                    normalize(uLightPosition[i]-vPosition),
                    uLightIntensity[i] / (dir * dir)
                )
            );
        }
    }

    fragColor += L_env(pbrInputs);

    #ifdef PBR_EMISSIVE_TEXTURE
    fragColor += texture2D(uMaterialEmissiveTexture, vEmissiveUV).rgb;
    #endif

    fragColor = pow(fragColor, vec3(1.0/2.2));

    return fragColor;
}


void main() {

    gl_FragColor = vec4(L(), 1.0);
    
}