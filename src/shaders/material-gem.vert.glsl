precision mediump float;

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);

    vPosition = (uMMatrix * vec4(aPosition, 1.0)).xyz;
    vNormal = normalize((uMMatrix * vec4( aNormal, 0.0)).xyz);
}