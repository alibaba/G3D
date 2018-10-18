attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

void main() {

    vec3 position = aPosition;

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(position, 1.0);
}
