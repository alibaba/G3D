class PointLight extends Light {

    position = { x: 0, y: 0, z: 0 };
    radius = 1;

    getPosition() {
        return [this.position.x, this.position.y, this.position.z];
    }

    getIntensity(){
        const intensity = super.getIntensity();
        return intensity * this.radius * this.radius;
    }
}

export default PointLight;