import Mesh from '../../mesh/mesh';
import Geometry from '../../geometry/geometry';

function createCone(scene, radius, height, segs = 16) {

    const vertices = [];
    const uvs = [];
    const normals = [];
    const indices = [];

    const halfHeight = height / 2;
    const dTheta = Math.PI * 2 / segs;

    const body = function () {
        const iStart = vertices.length / 3;

        const center = [0, halfHeight, 0];

        const beta = Math.atan(radius / height);
        const cosBeta = Math.cos(beta);
        const sinBeta = Math.sin(beta);

        for (let i = 0; i < segs; i++) {
            const theta = dTheta * i;

            const p = [Math.cos(theta) * radius, -halfHeight, Math.sin(theta) * radius];
            const n = [Math.cos(theta) * cosBeta, sinBeta, Math.sin(theta) * cosBeta];
            const uv = [0, 0];

            vertices.push(...center, ...p);
            normals.push(...n, ...n);
            uvs.push(...uv, ...uv);
            const base = iStart + i * 2;

            if (i !== segs - 1) {
                indices.push(base + 1, base, base + 3);
            } else {
                indices.push(base + 1, base, iStart + 1);
            }
        }


    }

    const cop = function (y) {

        const iStart = vertices.length / 3;

        const center = [0, halfHeight * y, 0];
        const normal = [0, y, 0];
        const uv = [0, 0];
        vertices.push(...center);
        normals.push(...normal);
        uvs.push(...uv);
        for (let i = 0; i < segs; i++) {
            const theta = i * dTheta;
            const p = [Math.cos(theta) * radius, halfHeight * y, Math.sin(theta) * radius];
            vertices.push(...p);
            normals.push(...normal);
            uvs.push(...uv);
            if (i !== segs - 1) {
                indices.push(iStart, iStart + i + 1, iStart + i + 2);
            } else {
                indices.push(iStart, iStart + i + 1, iStart + 1);
            }
        }
    }

    body();
    cop(-1);

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

export default createCone;