class LineMesh extends Mesh {

    geometry = new LineGeometry(this);
    materials = {
        default: new RawMaterial(this)
    }
    lineWidth = 2.0;

    constructor(scene) {
        super(scene);
    }
}

export default LineMesh;

