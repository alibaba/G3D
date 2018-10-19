import BaseCamera from './G3D.BaseCamera';
import Mat4 from '../math/G3D.Mat4';

class BaseOrthographicCamera extends BaseCamera {

    width: number = 10;
    viewRatio: number = 1;

    near: number = 1;
    far: number = 1000;

    constructor() {
        super();
    }

    getPMatrix(): Float32Array {
        const { width, viewRatio, near, far } = this;
        const height = width / viewRatio;

        return Mat4.ortho(Mat4.create(), -width / 2, width / 2, -height / 2, height / 2, near, far);
    }
}

export default BaseOrthographicCamera;