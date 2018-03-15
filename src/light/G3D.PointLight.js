class PointLight extends Light {

    position = { x: 0, y: 0, z: 0 };
    radius = 1;

    castShadow = false;
    castShadowFov = 10;

    getPosition() {
        return [this.position.x, this.position.y, this.position.z];
    }

    getIntensity() {
        const intensity = super.getIntensity();
        return intensity * this.radius * this.radius;
    }

    getShadowCamera() {

        if (!this.shadowCamera) {
            this.shadowCamera = new BasePerspectiveCamera();
        }

        const camera = this.shadowCamera;

        const { center } = this.scene.activeCamera;

        camera.center = { ...center };
        camera.fov = this.castShadowFov;
        camera.near = 7;
        camera.far = 120;

        camera.position = {...this.position};

        return camera;
    }
}

export default PointLight;