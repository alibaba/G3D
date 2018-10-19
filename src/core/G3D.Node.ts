import Mat4 from '../math/G3D.Mat4';
import Quat from '../math/G3D.Quat';
import Vec3 from '../math/G3D.Vec3';
import Vec4 from '../math/G3D.Vec4';

import IDirection from '../interfaces/G3D.IDirection';

let Node_ID = 1;

class Node {

    id: number = Node_ID++;

    position: IDirection = { x: 0, y: 0, z: 0 };
    rotation: IDirection = { x: 0, y: 0, z: 0 };
    scale: IDirection = { x: 1, y: 1, z: 1 };

    parent: Node = null;

    private positionValues = null;
    private quatValues = null;
    private scaleValues = null;
    private matrixValues = null;

    constructor() {}

    getWorldMatrix() {
        if (this.parent) {
            const parentMatrix = this.parent.getWorldMatrix();
            return Mat4.multiply(Mat4.create(), parentMatrix, this.getMatrix());
        } else {
            return this.getMatrix();
        }
    }

    getMatrix() {

        if (!this.quatValues) {
            this.quatValues = new Float32Array(4);
            this.positionValues = new Float32Array(3);
            this.scaleValues = new Float32Array(3);
            this.matrixValues = new Float32Array(16);
        }

        const quat = this.quatValues;
        const position = this.positionValues;
        const scale = this.scaleValues;
        const matrix = this.matrixValues;

        Quat.fromEuler(quat, this.rotation.x, this.rotation.y, this.rotation.z);
        Vec3.set(position, this.position.x, this.position.y, this.position.z);
        Vec3.set(scale, this.scale.x, this.scale.y, this.scale.z);

        Mat4.fromRotationTranslationScale(matrix, quat, position, scale);

        return matrix;
    }

    transformCoordinate(x, y, z) {

        const mat = this.getMatrix();
        const vec = Vec3.fromValues(x, y, z);

        const res = Vec3.transformMat4(Vec3.create(), vec, mat);

        return { x: res[0], y: res[1], z: res[2] };
    }

    transformNormal(x, y, z) {

        const mat = this.getMatrix();
        const vec = Vec4.fromValues(x, y, z, 0);

        const res = Vec4.transformMat4(Vec4.create(), vec, mat);

        return { x: res[0], y: res[1], z: res[2] };
    }

}

export default Node;