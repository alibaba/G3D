import Mesh from "../../mesh/mesh";

import LineGeometry from "../../geometry/line-geometry";
import LineMesh from "../../mesh/line-mesh";

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
        xc.materials.default.color = { r: 256, g: 0, b: 0 };
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
        yc.materials.default.color = { r: 0, g: 256, b: 0 };
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
        zc.materials.default.color = { r: 0, g: 0, b: 256 };
        zc.parent = mesh;
    }

    return mesh;
}

export default createCoordinate;
