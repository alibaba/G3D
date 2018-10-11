#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vPosition;
varying vec3 vNormal;

uniform samplerCube uRefractionMap;
uniform samplerCube uEnvMap;

uniform vec3 uCameraPos;

uniform bool uCullBack;


vec3 lighten(vec3 color, float f){
    return (vec3(1.0) - (vec3(1.0) - color) * f);
}

vec3 frag1(){
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(uCameraPos - vPosition);

    vec3 refractVector = refract(-view, normal, 1.0/2.4);
    vec3 reflectVector = reflect(-view, normal);

    vec3 refractColor = textureCube(uEnvMap, refractVector).rgb * 0.3;
    vec3 reflectColor = textureCube(uRefractionMap, reflectVector).rgb;

    vec3 color = refractColor + reflectColor;

    color = pow(color, vec3(2.2));

    

    return color;
}

vec3 frag2(){

    vec3 normal = normalize(vNormal);
    vec3 view = normalize(uCameraPos - vPosition);

    vec3 refractVector = refract(-view, normal, 1.0/2.4);
    vec3 reflectVector = reflect(-view, normal);

    vec3 refractColor = textureCube(uRefractionMap, refractVector).rgb;
    refractColor = pow(refractColor, vec3(2.2));

    vec3 envColor = textureCube(uEnvMap, reflectVector).rgb;
    vec3 reflectColor = textureCube(uEnvMap, reflectVector).rgb;

    refractColor = lighten(refractColor, 0.8);

    vec3 color = refractColor;

    return color;
}



void main() {

    vec3 color = uCullBack ? frag1() : frag2();

    gl_FragColor = vec4(color, 1.0);
}