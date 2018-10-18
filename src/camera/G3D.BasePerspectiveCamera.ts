import BaseCamera from './G3D.BaseCamera';

import Mat4 from '../math/G3D.Mat4';
import Vec3 from '../math/G3D.Vec3';

import Tools from '../math/G3D.Tools';
import Ray from '../math/G3D.Ray';

class PerspectiveCamera extends BaseCamera {

    fov = 60;
    viewRatio = 1;

    near = 1;
    far = 1000;

    constructor() {
        super();
    }

    getPMatrix() {
        const { near, far, fov, viewRatio } = this;
        return Mat4.perspective(Mat4.create(), Tools.deg2rad(fov), viewRatio, near, far);
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