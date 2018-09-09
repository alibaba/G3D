import PathParser from './parser.js';

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
        }
    });
    
    return mesh;
}

export { createLineFromPath, createMeshFromPath };