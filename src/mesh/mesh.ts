
import Geometry from "../geometry/geometry";
import PhongMaterial from "../material/phong-material";

import BaseMesh from "./base-mesh";
import ShaderMaterial from "../material/shader-material";

class Mesh extends BaseMesh {

    public geometry: Geometry = new Geometry();
    public materials: {
        [prop: string]: ShaderMaterial,
    } = {
            default: new PhongMaterial(),
        };

    constructor(scene) {
        super(scene);
    }

}

export default Mesh;
