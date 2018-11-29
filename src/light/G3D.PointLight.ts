import BaseLight from './G3D.BaseLight';
import BasePerspectiveCamera from '../camera/G3D.BasePerspectiveCamera';
import { IPosition } from '../types/raw';

class PointLight extends BaseLight {

    position: IPosition = { x: 0, y: 0, z: 0 };
    radius: number = 1;

    castShadow: boolean = false;
    castShadowFov: number = 10;

    private shadowCamera: BasePerspectiveCamera = new BasePerspectiveCamera();
    private positionValues: number[] = [0, 0, 0];

    getPosition(): number[] {
        this.positionValues[0] = this.position.x;
        this.positionValues[1] = this.position.y;
        this.positionValues[2] = this.position.z;
        return this.positionValues;
    }

    getIntensity(): number {
        const intensity = super.getIntensity();
        return intensity * this.radius * this.radius;
    }

    getShadowCamera(): BasePerspectiveCamera {

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