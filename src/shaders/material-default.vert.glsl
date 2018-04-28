precision highp float;

attribute vec3 aPosition;
attribute vec2 aUV;
attribute vec3 aNormal;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

#include <./uniforms/morph-target.vert.glsl>

varying vec2 vUV;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    vec3 position = aPosition;
    vec2 uv = aUV;
    vec3 normal = aNormal;

    #include <./snippets/morph-target.vert.glsl>

    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(position, 1.0);

    vUV = uv;
    vNormal = normalize((uMMatrix * vec4( normal, 0.0)).xyz);
    vPosition = (uMMatrix * vec4(position, 1.0)).xyz;
}