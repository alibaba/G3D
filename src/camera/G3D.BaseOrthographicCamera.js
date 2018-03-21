class BaseOrthographicCamera extends Node {

    center = { x: 0, y: 0, z: 0 };

    up = { x: 0, y: 1, z: 0 };

    width = 10;

    near = 1;
    far = 1000;

    viewRatio = 1;

    constructor() {
        super();
    }

    getVMatrix() {
        const matrix = Mat4.create();

        const center = Vec3.fromValues(this.center.x, this.center.y, this.center.z);
        const up = Vec3.fromValues(this.up.x, this.up.y, this.up.z);
        const position = Vec3.fromValues(this.position.x, this.position.y, this.position.z);
        Mat4.lookAt(matrix, position, center, up);
        Mat4.invert(matrix, matrix);

        const vMatrix = Mat4.create();
        Mat4.invert(vMatrix, matrix);

        return vMatrix;
    }

    getPMatrix() {
        const { width, viewRatio, near, far } = this;
        const height = width / viewRatio;

        return Mat4.ortho(Mat4.create(), -width / 2, width / 2, -height / 2, height / 2, near, far);
    }

    getPosition() {
        return new Float32Array([this.position.x, this.position.y, this.position.z]);
    }
}

export default BaseOrthographicCamera;