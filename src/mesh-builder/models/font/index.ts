import Mesh from '../../../mesh/G3D.Mesh';
import LineMesh from '../../../mesh/G3D.LineMesh';
import LineGeometry from '../../../geometry/G3D.LineGeometry';
import Geometry from '../../../geometry/G3D.Geometry';

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