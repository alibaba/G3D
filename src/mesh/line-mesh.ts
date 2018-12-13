import LineGeometry from "../geometry/line-geometry";
import RawMaterial from "../material/raw-material";
import BaseMesh from "./base-mesh";
import ShaderMaterial from "../material/shader-material";

class LineMesh extends BaseMesh {

    public geometry = new LineGeometry();
    public materials: {
        [prop: string]: ShaderMaterial,
    } = {
            default: new RawMaterial(),
        };
    public lineWidth = 2.0;

    constructor(scene) {
        super(scene);
    }
}

export default LineMesh;
