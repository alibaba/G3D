
class DirectionalLight extends Light {

    direction = { x: 0, y: 0, z: -1 };

    constructor(scene) {
        super(scene);
    }

    getDirection(){
        return [this.direction.x, this.direction.y, this.direction.z];
    }
}

export default DirectionalLight;