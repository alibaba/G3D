#ifdef GL_ES
precision mediump float;
#endif

uniform bool uMaterialTextureFlag;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUV;

#include <./uniforms/manually-flip-y.frag.glsl>

void main() {

    vec2 uv = vUV;

    #include <./snippets/manually-flip-y.frag.glsl>

    gl_FragColor = uMaterialTextureFlag ? texture2D(uTexture, uv) : vec4(uColor, 1.0);
}