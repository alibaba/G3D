@Lazy(
    [
        'normals'
    ],
    [
        'getBuffers'
    ]
)
class Geometry {

    vertices = null;
    indices = {};
    uvs = null;
    normals = null;

    constructor() {
    }

    destroy() {

    }

    getBuffers() {

        const engine = Engine.instance;

        const vertices = this.vertices ? {
            buffer: engine.createAttributeBuffer(
                new Float32Array(this.vertices)
            ),
            stride: 0,
            offset: 0
        } : null;

        const normals = this.normals ? {
            buffer: engine.createAttributeBuffer(
                new Float32Array(this.normals)
            ),
            stride: 0,
            offset: 0
        } : null;

        let uvs = null;
        if (this.uvs) {
            uvs = {};
            if (typeof this.uvs.length === 'number') {
                uvs = {
                    buffer: engine.createAttributeBuffer(
                        new Float32Array(this.uvs)
                    ),
                    stride: 0,
                    offset: 0
                }
            } else {
                Object.keys(this.uvs).forEach(key => {
                    uvs[key] = {
                        buffer: engine.createAttributeBuffer(
                            new Float32Array(this.uvs[key])
                        ),
                        stride: 0,
                        offset: 0
                    }
                });
            }
        }

        const indices = {};
        Object.keys(this.indices).forEach(key => {

            indices[key] = this.indices[key] ? {
                buffer: engine.createElementBuffer(
                    new Uint32Array(this.indices[key])
                ),
                mode: 'TRIANGLES',
                count: this.indices[key].length,
                type: 'UNSIGNED_INT',
                offset: 0
            } : null;

        });

        return {
            vertices,
            uvs,
            normals,
            indices
        }
    }

    mergeNormals() {

        const { vertices, normals } = this;
        const unmergedNormals = [...normals];

        const hash = {};

        for (let i = 0; i < vertices.length; i += 3) {
            const key = [vertices[i], vertices[i + 1], vertices[i + 2]].join(',');
            if (!hash[key]) {
                hash[key] = {
                    indices: [],
                    normal: [0, 0, 0]
                }
            }

            const hashItem = hash[key];
            hashItem.indices.push(i / 3);
            hashItem.normal[0] += normals[i];
            hashItem.normal[1] += normals[i + 1];
            hashItem.normal[2] += normals[i + 2];
        }

        for (let key in hash) {
            const { indices, normal } = hash[key];
            for (let i = 0; i < indices.length; i++) {
                let idx = indices[i];
                normals[idx * 3] = normal[0] / indices.length;
                normals[idx * 3 + 1] = normal[1] / indices.length;
                normals[idx * 3 + 2] = normal[2] / indices.length;
            }
        }

        this.normals = normals;

        return () => {
            this.normals = unmergedNormals;
        };
    }
}

export default Geometry;