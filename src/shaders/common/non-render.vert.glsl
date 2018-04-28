attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

#include <../uniforms/morph-target-position-alone.vert.glsl>

void main() {

    vec3 position = aPosition;

    #include <../snippets/morph-target-position-alone.vert.glsl>

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(position, 1.0);
}