precision mediump float;

attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;

#ifdef RAW_TEXTURE
attribute vec2 aUV;
varying vec2 vUV;
#endif

void main() {
    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);

    #ifdef RAW_TEXTURE
    vUV = aUV;
    #endif
}