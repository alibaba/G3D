attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

uniform bool uMorphTargetFlag;
uniform float uMorphPhase;
attribute vec3 aPosition2;

void main() {

    vec3 aPositionRes = aPosition;

    if(uMorphTargetFlag){
        aPositionRes = mix(aPosition, aPosition2, uMorphPhase);
    }

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPositionRes, 1.0);
}