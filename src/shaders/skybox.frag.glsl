precision highp float;

uniform samplerCube uCubeMap;

varying vec3 vUV;

void main() {
    gl_FragColor = textureCube(uCubeMap, vUV);
}
