import BaseCamera from './base-camera';
import Mat4, { IMat4 } from '../matrix/mat4';

class BaseOrthographicCamera extends BaseCamera {

    width: number = 10;
    viewRatio: number = 1;
    near: number = 1;
    far: number = 1000;

    private projectMatrixValues: IMat4 = Mat4.create();

    getPMatrix(): IMat4 {
        const { width } = this;
        const height = width / this.viewRatio;

        Mat4.ortho(this.projectMatrixValues, -width / 2, width / 2, -height / 2, height / 2, this.near, this.far);

        return this.projectMatrixValues;
    }
}

export default BaseOrthographicCamera;