import Mat4, { IMat4 } from "../matrix/mat4";
import BaseCamera from "./base-camera";

class BaseOrthographicCamera extends BaseCamera {

    public width: number = 10;
    public viewRatio: number = 1;
    public near: number = 1;
    public far: number = 1000;

    private projectMatrixValues: IMat4 = Mat4.create();

    public getPMatrix(): IMat4 {
        const { width } = this;
        const height = width / this.viewRatio;

        Mat4.ortho(this.projectMatrixValues, -width / 2, width / 2, -height / 2, height / 2, this.near, this.far);

        return this.projectMatrixValues;
    }
}

export default BaseOrthographicCamera;
