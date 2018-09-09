function createBox(scene, left, right, top, bottom, front, back) {

    const mesh = new Mesh(scene);

    mesh.geometry = new Geometry({

        vertices: [

            left, top, front, // 0
            left, bottom, front,
            right, bottom, front,
            right, top, front,

            left, top, back, // 4
            right, top, back,
            right, bottom, back,
            left, bottom, back,

            left, bottom, front, // 8
            left, bottom, back,
            left, top, back,
            left, top, front,

            right, bottom, front, // 12
            right, bottom, back,
            right, top, back,
            right, top, front,

            left, top, front, // 16
            left, top, back,
            right, top, back,
            right, top, front,

            left, bottom, front, //20
            left, bottom, back,
            right, bottom, back,
            right, bottom, front,

        ],

        normals: [
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        ],


        uvs: [
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0
        ],

        indices: {
            default: [
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ]
        }
    })

    return mesh;
}

export default createBox;