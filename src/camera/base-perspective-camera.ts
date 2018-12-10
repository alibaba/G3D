import BaseCamera from "./base-camera";

import Mat4, { IMat4 } from "../matrix/mat4";
import Vec3 from "../matrix/vec3";

import { deg2rad } from "../utils/math";

import ViewRay from "./view-ray";

class BasePerspectiveCamera extends BaseCamera {

    public fov: number = 60;           // in degrees
    public viewRatio: number = 1;
    public near: number = 1;
    public far: number = 1000;

    private projectMatrixValues: IMat4 = Mat4.create();

    public getPMatrix(): IMat4 {
        Mat4.perspective(this.projectMatrixValues, deg2rad(this.fov), this.viewRatio, this.near, this.far);
        return this.projectMatrixValues;
    }

    // TODO: make it better
    public getViewRay(x, y, flip = true) {

        if (flip) {
            y = 1 - y;
        }

        const tx = (x - 0.5) * 2;
        const ty = (y - 0.5) * 2;

        const pMatrix = this.getPMatrix();

        const p2 = Vec3.fromValues(tx, ty, 1);

        Vec3.transformMat4(p2, p2, Mat4.invert(Mat4.create(), pMatrix));
        Vec3.transformMat4(p2, p2, Mat4.invert(Mat4.create(), this.getVMatrix()));

        const direction = Vec3.sub(
            Vec3.create(), p2,
            Vec3.fromValues(this.position.x, this.position.y, this.position.z),
        );

        const ray = new ViewRay();
        ray.origin.x = this.position.x;
        ray.origin.y = this.position.y;
        ray.origin.z = this.position.z;

        ray.direction.x = direction[0];
        ray.direction.y = direction[1];
        ray.direction.z = direction[2];

        return ray;
    }
}

export default BasePerspectiveCamera;
