
import Geometry from '../geometry/G3D.Geometry';
import PhongMaterial from '../material/G3D.PhongMaterial';

import BaseMesh from './G3D.BaseMesh';

class Mesh extends BaseMesh {

    geometry = new Geometry();
    materials = {
        default: new PhongMaterial()
    };

    constructor(scene) {
        super(scene);
    }

}

export default Mesh;