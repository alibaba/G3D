import { IColorRGB } from "../types/raw";
import Scene from "../scene/scene";


class BaseLight {

    scene: Scene;
    color: IColorRGB = { r: 255, g: 255, b: 255 };
    intensity: number = 1;

    private colorValues: number[] = [255, 255, 255];

    constructor(scene: Scene) {
        this.scene = scene;
        scene.lights.push(this);
    }

    getColor(): number[] {
        this.colorValues[0] = this.color.r;
        this.colorValues[1] = this.color.g;
        this.colorValues[2] = this.color.b;
        return this.colorValues;
    }

    getIntensity(): number {
        return this.intensity;
    }
}

export default BaseLight;