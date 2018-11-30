
import Geometry from '../geometry/geometry';
import PhongMaterial from '../material/phong-material';

import BaseMesh from './base-mesh';

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