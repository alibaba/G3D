import Scene from "../scene/scene";
import { IColorRGB } from "../types/raw";

class BaseLight {

    public scene: Scene;
    public color: IColorRGB = { r: 255, g: 255, b: 255 };
    public intensity: number = 1;

    private colorValues: number[] = [255, 255, 255];

    constructor(scene: Scene) {
        this.scene = scene;
        scene.lights.push(this);
    }

    public getColor(): number[] {
        this.colorValues[0] = this.color.r;
        this.colorValues[1] = this.color.g;
        this.colorValues[2] = this.color.b;
        return this.colorValues;
    }

    public getIntensity(): number {
        return this.intensity;
    }
}

export default BaseLight;
