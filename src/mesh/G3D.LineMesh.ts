import Mesh from './G3D.Mesh';

import LineGeometry from '../geometry/G3D.LineGeometry';
import RawMaterial from '../material/G3D.RawMaterial';


class LineMesh extends Mesh {

    geometry: any = new LineGeometry();
    materials: any = {
        default: new RawMaterial()
    }
    lineWidth = 2.0;

    constructor(scene) {
        super(scene);
    }
}

export default LineMesh;

