import LineGeometry from '../geometry/G3D.LineGeometry';
import RawMaterial from '../material/G3D.RawMaterial';
import BaseMesh from './G3D.BaseMesh';


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

