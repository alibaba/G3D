class DirectionalLight extends Light {

    direction = { x: 0, y: 0, z: -1 };

    castShadow = false;

    constructor(scene) {
        super(scene);
    }

    getDirection() {
        return [this.direction.x, this.direction.y, this.direction.z];
    }


    getShadowCamera() {

        if (!this.shadowCamera) {
            this.shadowCamera = new BaseOrthographicCamera();
        }

        const camera = this.shadowCamera;

        const { center } = this.scene.activeCamera;

        camera.center = { ...center };
        camera.width = 5;
        camera.near = 2;
        camera.far = 20;

        camera.position = { ...this.direction };
        return camera;
    }

}

export default DirectionalLight;