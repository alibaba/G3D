attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

#include <./snippets/morph-target-position.vert.glsl>

void main() {

    vec3 aPositionRes = aPosition;

    morphTargetPosition(aPositionRes);
    
    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPositionRes, 1.0);
}