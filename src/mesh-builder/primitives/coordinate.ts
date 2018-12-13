import Mesh from "../../mesh/mesh";

import LineGeometry from "../../geometry/line-geometry";
import LineMesh from "../../mesh/line-mesh";
import RawMaterial from "../../material/raw-material";

function createCoordinate(scene, size) {

    const mesh = new Mesh(scene);

    {
        const xc = new LineMesh(scene);
        xc.geometry = new LineGeometry({
            vertices: [0, 0, 0, size, 0, 0],
            indices: {
                default: [0, 1],
            },
        });
        const redMtl = new RawMaterial();
        redMtl.color = { r: 256, g: 0, b: 0 };
        xc.materials.default = redMtl;
        xc.parent = mesh;
    }

    {
        const yc = new LineMesh(scene);
        yc.geometry = new LineGeometry({
            vertices: [0, 0, 0, 0, size, 0],
            indices: {
                default: [0, 1],
            },
        });
        const greenMtl = new RawMaterial();
        greenMtl.color = { r: 0, g: 256, b: 0 };
        yc.materials.default = greenMtl;
        yc.parent = mesh;
    }

    {
        const zc = new LineMesh(scene);
        zc.geometry = new LineGeometry({
            vertices: [0, 0, 0, 0, 0, size],
            indices: {
                default: [0, 1],
            },
        });
        const blueMtl = new RawMaterial();
        blueMtl.color = { r: 0, g: 0, b: 256 };
        zc.materials.default = blueMtl;
        zc.parent = mesh;
    }

    return mesh;
}

export default createCoordinate;
