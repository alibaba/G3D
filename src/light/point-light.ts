import BasePerspectiveCamera from "../camera/base-perspective-camera";
import { IPosition } from "../types/raw";
import BaseLight from "./base-light";

class PointLight extends BaseLight {

    public position: IPosition = { x: 0, y: 0, z: 0 };
    public radius: number = 1;

    public castShadow: boolean = false;
    public castShadowFov: number = 10;

    private shadowCamera: BasePerspectiveCamera = new BasePerspectiveCamera();
    private positionValues: number[] = [0, 0, 0];

    public getPosition(): number[] {
        this.positionValues[0] = this.position.x;
        this.positionValues[1] = this.position.y;
        this.positionValues[2] = this.position.z;
        return this.positionValues;
    }

    public getIntensity(): number {
        const intensity = super.getIntensity();
        return intensity * this.radius * this.radius;
    }

    public getShadowCamera(): BasePerspectiveCamera {

        const camera = this.shadowCamera;

        const { center } = this.scene.activeCamera;
        const { position } = this;

        camera.center = { ...center };
        camera.position = { ...position };

        camera.fov = this.castShadowFov;
        camera.near = 7;
        camera.far = 120;

        return camera;
    }
}

export default PointLight;
