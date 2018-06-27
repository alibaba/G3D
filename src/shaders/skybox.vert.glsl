precision highp float;

attribute vec3 aPosition;

uniform mat3 uVMatrix3;
uniform mat4 uPMatrix;

varying vec3 vUV;

void main()
{
    gl_Position = uPMatrix * mat4(uVMatrix3) * vec4(aPosition, 1.0);
    vUV = aPosition;
}