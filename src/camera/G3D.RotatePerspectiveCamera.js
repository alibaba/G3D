class RotatePerspectiveCamera extends BasePerspectiveCamera {

    radius = 0;
    alpha = 0;
    beta = 0;

    constructor(scene) {
        super();

        const { width, height } = scene.engine;

        this.viewRatio = width / height;

        this.scene = scene;

        scene.activeCamera = this;
    }

    getVMatrix() {

        const r2 = Math.cos(Tools.deg2rad(this.beta)) * this.radius;
        const y = Math.sin(Tools.deg2rad(this.beta)) * this.radius;
        const x = Math.sin(Tools.deg2rad(this.alpha)) * r2;
        const z = Math.cos(Tools.deg2rad(this.alpha)) * r2;

        const center = this.center;
        this.position.x = center.x + x;
        this.position.y = center.y + y;
        this.position.z = center.z + z;

        return super.getVMatrix();
    }

    getViewRay(x, y, flip) {
        const { width, height } = this.scene.engine;
        return super.getViewRay(x / width, y / height, flip);
    }
}

export default RotatePerspectiveCamera;