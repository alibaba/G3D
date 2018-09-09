function createSphere(scene, radius, widthSeg = 16, heightSeg = 12) {

    const phiStart = 0;
    const phiLength = Math.PI * 2;

    const thetaStart = 0;
    const thetaLength = Math.PI;

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    const grid = [];
    let index = 0;

    for (let iy = 0; iy <= heightSeg; iy++) {
        const verticesRow = [];

        const v = iy / heightSeg;
        for (let ix = 0; ix <= widthSeg; ix++) {
            const u = ix / widthSeg;

            const x = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
            const y = radius * Math.cos(thetaStart + v * thetaLength);
            const z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

            vertices.push(x, y, z);

            const normal = Vec3.normalize(Vec3.create(), Vec3.fromValues(x, y, z));
            normals.push(...normal);

            uvs.push(u, v);

            verticesRow.push(index++);
        }

        grid.push(verticesRow);
    }

    for (let iy = 0; iy < heightSeg; iy++) {
        for (let ix = 0; ix < widthSeg; ix++) {
            const a = grid[iy][ix + 1];
            const b = grid[iy][ix];
            const c = grid[iy + 1][ix];
            const d = grid[iy + 1][ix + 1];
            if (iy !== 0 || thetaStart > 0) {
                indices.push(a, b, d)
            };
            if (iy !== heightSeg - 1 || thetaLength < Math.PI) {
                indices.push(b, c, d)
            };
        }
    }

    const mesh = new Mesh(scene);
    mesh.geometry = new Geometry({
        vertices, uvs, normals, indices: {
            default: indices
        }
    });

    return mesh;
}

export default createSphere;