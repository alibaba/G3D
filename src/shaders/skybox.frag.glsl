precision highp float;

uniform samplerCube uCubeTexture;

varying vec3 vUV;

void main() {
    gl_FragColor = textureCube(uCubeTexture, normalize(vUV));
}
