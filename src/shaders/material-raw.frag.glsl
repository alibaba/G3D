#ifdef GL_ES
precision mediump float;
#endif

#ifdef RAW_TEXTURE
uniform sampler2D uTexture;
varying vec2 vUV;
#else
uniform vec3 uColor;
#endif

void main() {

    #ifdef RAW_TEXTURE
        gl_FragColor = texture2D(uTexture, vUV);
    #else
        gl_FragColor = vec4(uColor, 1.0);
    #endif

}