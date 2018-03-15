#ifdef GL_ES
precision mediump float;
#endif

void main() {
    gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 1.0);
}