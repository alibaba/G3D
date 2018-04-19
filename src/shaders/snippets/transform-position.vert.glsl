attribute vec3 aPosition;

uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;


void transformPosition(out vec3 positionRes, in vec3 position){

    positionRes = (uPMatrix * uVMatrix * uMMatrix * vec4(position, 1.0)).xyz;

}