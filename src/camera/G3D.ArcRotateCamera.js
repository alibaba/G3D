class ArcRotateCamera extends PerspectiveCamera {

    radius = 0;
    alpha = 0;
    beta = 0;

    constructor(scene, center, radius, alpha, beta) {
        super(scene, Math.PI / 2, 1, 101);
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
}

export default ArcRotateCamera;