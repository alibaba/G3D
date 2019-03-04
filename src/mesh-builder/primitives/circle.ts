import Geometry from "../../geometry/geometry";
import Mesh from "../../mesh/mesh";

function createCircle(scene, radius, segs = 16) {

    const thetaStart = 0;
    const thetaLength = Math.PI * 2;

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    const center = [0, 0, 0];
    const normal = [0, 0, 1];
    const uv = [0.5, 0.5];
    vertices.push(...center);
    normals.push(...normal);
    uvs.push(...uv);

    const dTheta = thetaLength / segs;

    for (let i = 0; i <= segs; i++) {

        const theta = i * dTheta;

        const tx = Math.cos(thetaStart + theta);
        const ty = Math.sin(thetaStart + theta);
        const p = [tx * radius, ty * radius, 0];

        vertices.push(...p);
        normals.push(...normal);
        uvs.push((tx + 1) / 2, (ty + 1) / 2);

    }

    for (let i = 0; i < segs; i++) {

        indices.push(0, i + 1, i + 2);

    }

    const mesh = new Mesh(scene);
    mesh.geometry = new Geometry({
        vertices,
        uvs,
        normals,
        indices: {
            default: indices,
        },
        facing: Geometry.FACING.BOTH,
    });

    return mesh;
}

export default createCircle;