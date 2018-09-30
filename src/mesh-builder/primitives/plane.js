function createPlane(scene, width, height = width) {

    const hWidth = width / 2;
    const hHeight = height / 2;

    const mesh = new Mesh(scene);

    const vertices = [
        -hWidth, -hHeight, 0,
        hWidth, -hHeight, 0,
        hWidth, hHeight, 0,
        -hWidth, hHeight, 0,
    ];
    const uvs = [0, 0, 1, 0, 1, 1, 0, 1];
    const normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
    const indices = {
        default: [0, 1, 2, 0, 2, 3]
    };

    mesh.geometry = new Geometry({
        vertices,
        uvs,
        normals,
        indices
    });

    return mesh;
}

export default createPlane;