import Mesh from '../../mesh/mesh';
import Geometry from '../../geometry/geometry';

function createBox(scene, left, right, top, bottom, front, back) {

    const mesh = new Mesh(scene);

    const verticeSources = [
        [left, bottom, front],
        [right, bottom, front],
        [right, top, front],
        [left, top, front],
        [left, bottom, back],
        [right, bottom, back],
        [right, top, back],
        [left, top, back],
    ];

    const normalSources = [
        [0, 0, 1],
        [1, 0, 0],
        [0, 0, -1],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0]
    ];

    mesh.geometry = new Geometry({

        vertices: [
            0, 1, 2, 3,
            1, 5, 6, 2,
            5, 4, 7, 6,
            4, 0, 3, 7,
            3, 2, 6, 7,
            4, 5, 1, 0
        ].reduce(
            (acc, i) => {
                acc.push(...verticeSources[i]);
                return acc;
            },
            []
        ),

        normals: [0, 1, 2, 3, 4, 5].reduce(
            (acc, i) => {
                let c = 4;
                while (c > 0) {
                    acc.push(...normalSources[i]);
                    c--;
                }
                return acc;
            },
            []
        ),

        uvs: [0, 1, 2, 3, 4, 5].reduce(
            (acc) => {
                acc.push(0, 0, 1, 0, 1, 1, 0, 1);
                return acc;
            },
            []
        ),

        indices: {
            default: [0, 1, 2, 3, 4, 5].reduce(
                (acc, i) => {
                    acc.push(...[0, 1, 2, 0, 2, 3].map(n => n + i * 4));
                    return acc;
                },
                []
            )
        }
    })

    return mesh;
}

export default createBox;