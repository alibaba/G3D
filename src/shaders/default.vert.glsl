attribute vec3 aPosition;
attribute vec2 aUV;
attribute vec3 aNormal;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

uniform bool uMorphTargetFlag;
uniform float uMorphPhase;
attribute vec3 aPosition2;
attribute vec2 aUV2;
attribute vec3 aNormal2;

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    vec3 aPositionRes = aPosition;
    vec2 aUVRes = aUV;
    vec3 aNormalRes = aNormal;

    if(uMorphTargetFlag){
        aPositionRes = mix(aPosition, aPosition2, uMorphPhase);
        aUVRes = mix(aUV, aUV2, uMorphPhase);
        aNormalRes = mix(aNormal, aNormal2, uMorphPhase);
    }

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPositionRes, 1.0);

    vUV = aUVRes;
    vNormal = normalize((uMMatrix * vec4( aNormalRes, 0.0)).xyz);
    vPosition = (uMMatrix * vec4(aPositionRes, 1.0)).xyz;
}