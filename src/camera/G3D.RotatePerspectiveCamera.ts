import BasePerspectiveCamera from './G3D.BasePerspectiveCamera';

import GL from '../core/G3D.GL';
import Scene from '../scene/G3D.Scene';
import { deg2rad } from '../utils/math';
import { IMat4 } from '../matrix/G3D.Mat4';

class RotatePerspectiveCamera extends BasePerspectiveCamera {

    radius: number = 100;
    alpha: number = 45;
    beta: number = 45;

    constructor(scene: Scene) {

        super();

        const { width, height } = GL;
        this.viewRatio = width / height;

        scene.activeCamera = this;
    }

    getVMatrix(): IMat4 {

        const r2 = Math.cos(deg2rad(this.beta)) * this.radius;
        const y = Math.sin(deg2rad(this.beta)) * this.radius;
        const x = Math.sin(deg2rad(this.alpha)) * r2;
        const z = Math.cos(deg2rad(this.alpha)) * r2;

        const center = this.center;
        this.position.x = center.x + x;
        this.position.y = center.y + y;
        this.position.z = center.z + z;

        return super.getVMatrix();
    }


    getViewRay(x, y, flip) {

        const { width, height } = GL;

        return super.getViewRay(x / width, y / height, flip);
    }
}

export default RotatePerspectiveCamera;