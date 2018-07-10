class LineMesh extends Mesh {

    geometry = new LineGeometry();
    materials = {
        default: new RawMaterial()
    }
    lineWidth = 2.0;

    constructor(scene) {
        super(scene);
    }
}

export default LineMesh;

