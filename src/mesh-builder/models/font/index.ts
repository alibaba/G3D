import Mesh from '../../../mesh/mesh';
import LineMesh from '../../../mesh/line-mesh';
import LineGeometry from '../../../geometry/line-geometry';
import Geometry from '../../../geometry/geometry';

import PathParser from './parser';

function createLineFromPath(scene, path, resolution) {

    const { vertices, indices } = PathParser.parseToLine(path, resolution);

    const line = new LineMesh(scene);

    line.geometry = new LineGeometry({
        vertices: [...vertices],
        indices: {
            default: [...indices]
        }
    });

    return line;
}

function createMeshFromPath(scene, path, thickness, resolution) {

    const { vertices, indices, uvs, normals } = PathParser.parseToGeometry(path, thickness, resolution);

    const mesh = new Mesh(scene);

    mesh.geometry = new Geometry({
        vertices,
        normals,
        uvs,
        indices: {
            default: indices
        },
        facing: Geometry.FACING.BOTH
    });
    
    return mesh;
}

export { createLineFromPath, createMeshFromPath };