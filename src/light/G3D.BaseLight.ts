class BaseLight {

    scene = null;
    color = { r: 255, g: 255, b: 255 };
    intensity = 1;

    constructor(scene) {
        this.scene = scene;
        scene.lights.push(this);
    }

    getColor() {
        return [this.color.r, this.color.g, this.color.b];
    }

    getIntensity() {
        return this.intensity;
    }
}

export default BaseLight;