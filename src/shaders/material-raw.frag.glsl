#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 uColor;

#ifdef RAW_TEXTURE
uniform sampler2D uTexture;
varying vec2 vUV;
#endif

void main() {

    #ifdef RAW_TEXTURE
        gl_FragColor = vec4(texture2D(uTexture, vUV).rgb * uColor.rgb, 1.0);
    #else
        gl_FragColor = vec4(uColor, 1.0);
    #endif

}