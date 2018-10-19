import Node from '../core/G3D.Node';
import Mat4 from '../math/G3D.Mat4';
import Vec3 from '../math/G3D.Vec3';

import IPosition from '../interfaces/G3D.IPosition';
import IDirection from '../interfaces/G3D.IDirection';

class BaseCamera extends Node {

    center: IPosition = { x: 0, y: 0, z: 0 };

    up: IDirection = { x: 0, y: 1, z: 0 };

    constructor() {
        super();
    }

    // TODO: make it better
    getVMatrix(): Float32Array {

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
}

export default BaseCamera;