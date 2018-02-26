#ifdef GL_ES
precision mediump float;
#endif

uniform int meshId;
void main() {
    float n = float(meshId);
    float n1 = fract(n / 16.0);
    n = n / 16.0 - n1;
    float n2 = fract(n / 16.0);
    n = n / 16.0 - n2;
    float n3 = fract(n / 16.0);
    n = n / 16.0 - n3;
    float n4 = fract(n / 16.0);
    gl_FragColor = vec4(n1, n2, n3, n4);
}