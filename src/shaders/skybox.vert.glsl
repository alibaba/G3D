precision highp float;

attribute vec3 aPosition;

uniform mat4 uVMatrix;
uniform mat4 uPMatrix;

varying vec3 vUV;

void main()
{
    gl_Position = uPMatrix * uVMatrix * vec4(aPosition, 1.0);
    vUV = aPosition;
}
