import { IMat4 } from "../matrix/mat4";
import Scene from "../scene/scene";
import BaseOrthographicCamera from "./base-orthographic-camera";

import GL from "../core/gl";
import { deg2rad } from "../utils/math";

class RotateOrthographicCamera extends BaseOrthographicCamera {

    public radius: number = 100;
    public alpha: number = 45;
    public beta: number = 45;

    constructor(scene: Scene) {

        super();

        const { width, height } = GL;
        this.viewRatio = width / height;

        scene.activeCamera = this;
    }

    public getVMatrix(): IMat4 {

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
    public getViewRay(x, y, flip) {
        // const { width, height } = Engine.instance;
        // return super.getViewRay(x / width, y / height, flip);
    }
}

export default RotateOrthographicCamera;
