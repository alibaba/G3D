import LineGeometry from '../geometry/line-geometry';
import RawMaterial from '../material/raw-material';
import BaseMesh from './base-mesh';


class LineMesh extends BaseMesh {

    geometry = new LineGeometry();
    materials: any = {
        default: new RawMaterial()
    }
    lineWidth = 2.0;

    constructor(scene) {
        super(scene);
    }
}

export default LineMesh;

