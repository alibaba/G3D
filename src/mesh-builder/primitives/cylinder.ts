import Mesh from '../../mesh/mesh';
import Geometry from '../../geometry/geometry';

function createCylinder(scene, radius, height, segs = 16) {

    const vertices = [];
    const uvs = [];
    const normals = [];
    const indices = [];

    const dTheta = Math.PI * 2 / segs;
    const halfHeight = height / 2;

    const body = function () {

        const iStart = vertices.length / 3;

        for (let i = 0; i < segs; i++) {

            const theta1 = dTheta * i;

            const p1 = [Math.cos(theta1) * radius, -halfHeight, Math.sin(theta1) * radius];
            const p2 = [Math.cos(theta1) * radius, halfHeight, Math.sin(theta1) * radius];
            const n1 = [p1[0], 0, p1[2]];
            const n2 = [p2[0], 0, p2[2]];

            vertices.push(...p1, ...p2);
            uvs.push(0, 0, 0, 0);
            normals.push(...n1, ...n2);

            const base = i * 2;
            if (i === segs - 1) {
                indices.push(base, base + 1, iStart + 1, base, iStart + 1, iStart);
            } else {
                indices.push(base, base + 1, base + 3, base, base + 3, base + 2);
            }
        }
    }

    const cop = function (y, top = true) {

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

            if (top) {
                if (i !== segs - 1) {
                    indices.push(iStart, iStart + i + 1, iStart + i + 2);
                } else {
                    indices.push(iStart, iStart + i + 1, iStart + 1);
                }
            } else {
                if (i !== segs - 1) {
                    indices.push(iStart, iStart + i + 2, iStart + i + 1);
                } else {
                    indices.push(iStart, iStart + 1, iStart + i + 1);
                }
            }
        }
    }

    body();
    cop(1, false);
    cop(-1, true);

    const mesh = new Mesh(scene);
    mesh.geometry = new Geometry({
        vertices,
        normals,
        uvs,
        indices: {
            default: indices
        }
    })

    return mesh;
}

export default createCylinder;