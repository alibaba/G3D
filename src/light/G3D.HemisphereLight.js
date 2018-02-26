class HemisphereLight extends Light {

    sky = { r: 255, g: 255, b: 255 };
    ground = { r: 0, g: 0, b: 0 };
    up = { x: 0, y: 1, z: 0 };

    constructor(...args) {
        super(...args);
    }

    getSky() {
        return [this.sky.r, this.sky.g, this.sky.b];
    }

    getGround() {
        return [this.ground.r, this.ground.g, this.ground.b];
    }

    getUp() {
        return [this.up.x, this.up.y, this.up.z];
    }
}

export default HemisphereLight;