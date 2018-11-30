import BaseLight from "./base-light";

import BaseOrthographicCamera from "../camera/base-orthographic-camera";
import Scene from "../scene/scene";
import { IDirection } from "../types/raw";

class DirectionalLight extends BaseLight {

    public direction: IDirection = { x: 0, y: 0, z: -1 };

    public castShadow: boolean = false;

    private shadowCamera: BaseOrthographicCamera = new BaseOrthographicCamera();
    private directionValues: number[] = [0, 0, -1];

    constructor(scene: Scene) {
        super(scene);
    }

    public getDirection(): number[] {
        this.directionValues[0] = this.direction.x;
        this.directionValues[1] = this.direction.y;
        this.directionValues[2] = this.direction.z;
        return this.directionValues;
    }

    public getShadowCamera(): BaseOrthographicCamera {

        const camera = this.shadowCamera;

        const { center } = this.scene.activeCamera;
        const { direction } = this;

        camera.center = { ...center };
        camera.position = { ...direction };

        // TODO: make these configurable
        camera.width = 5;
        camera.near = 5;
        camera.far = 15;

        return camera;
    }

}

export default DirectionalLight;
