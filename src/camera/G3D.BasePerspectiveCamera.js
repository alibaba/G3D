class PerspectiveCamera extends Node {

    center = { x: 0, y: 0, z: 0 };

    up = { x: 0, y: 1, z: 0 };

    near = 1;
    far = 1000;

    fov = 90;

    viewRatio = 1;

    constructor(scene) {
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
        const { near, far, fov, viewRatio } = this;
        return Mat4.perspective(Mat4.create(), Tools.deg2rad(fov), viewRatio, near, far);
    }

    getPosition() {
        return new Float32Array([this.position.x, this.position.y, this.position.z]);
    }

    getViewRay(x, y, flip = true) {

        if (flip) {
            y = 1 - y;
        }

        const tx = (x - 0.5) * 2;
        const ty = (y - 0.5) * 2;

        const pMatrix = this.getPMatrix();

        let p2 = Vec3.fromValues(tx, ty, 1);

        Vec3.transformMat4(p2, p2, Mat4.invert(Mat4.create(), pMatrix));
        Vec3.transformMat4(p2, p2, Mat4.invert(Mat4.create(), this.getVMatrix()));

        const direction = Vec3.sub(Vec3.create(), p2, Vec3.fromValues(this.position.x, this.position.y, this.position.z));

        const ray = new Ray();
        ray.origin.x = this.position.x;
        ray.origin.y = this.position.y;
        ray.origin.z = this.position.z;

        ray.direction.x = direction[0];
        ray.direction.y = direction[1];
        ray.direction.z = direction[2];

        return ray;
    }
}

export default PerspectiveCamera;