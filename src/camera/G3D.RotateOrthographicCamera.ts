import BaseOrthographicCamera from './G3D.BaseOrthographicCamera';
import { IMat4 } from '../math/G3D.Mat4';
import Scene from '../scene/G3D.Scene';

import { deg2rad } from '../utils/deg-rad';



class RotateOrthographicCamera extends BaseOrthographicCamera {

    radius: number = 100;
    alpha: number = 45;
    beta: number = 45;

    constructor(scene: Scene) {

        super();

        const { width, height } = scene.engine;
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

    // TODO: add view ray for ortho camera
    getViewRay(x, y, flip) {
        // const { width, height } = Engine.instance;
        // return super.getViewRay(x / width, y / height, flip);
    }
}

export default RotateOrthographicCamera;