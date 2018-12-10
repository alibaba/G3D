
import Geometry from "../geometry/geometry";
import PhongMaterial from "../material/phong-material";

import BaseMesh from "./base-mesh";

class Mesh extends BaseMesh {

    public geometry = new Geometry();
    public materials = {
        default: new PhongMaterial(),
    };

    constructor(scene) {
        super(scene);
    }

}

export default Mesh;
