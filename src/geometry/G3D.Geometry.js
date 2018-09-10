class Geometry {

    bufferViews = {};

    constructor({ vertices, normals, uvs, indices } = {}) {

        if (vertices) {

            if (vertices instanceof BufferView) {

                this.bufferViews.vertices = vertices;

            } else {

                this.bufferViews.vertices = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(vertices),
                        target: 'ARRAY_BUFFER'
                    })
                });
            }

        }

        if (normals) {

            if (normals instanceof BufferView) {

                this.bufferViews.normals = normals;

            } else {

                this.bufferViews.normals = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(normals),
                        target: 'ARRAY_BUFFER'
                    })
                });

            }
        }

        if (uvs) {



            if (uvs instanceof BufferView || typeof uvs.length === 'number') {

                if (uvs instanceof BufferView) {

                    this.bufferViews.uvs = uvs;

                } else {

                    this.bufferViews.uvs = new BufferView({
                        buffer: new Buffer({
                            data: new Float32Array(uvs),
                            target: 'ARRAY_BUFFER'
                        })
                    })

                }

            } else {
                this.bufferViews.uvs = {};

                Object.keys(uvs).forEach(key => {

                    if (uvs[key] instanceof BufferView) {

                        this.bufferViews.uvs[key] = uvs[key];

                    } else {

                        this.bufferViews.uvs[key] = new BufferView({
                            buffer: new Buffer({
                                data: new Float32Array(uvs[key]),
                                target: 'ARRAY_BUFFER'
                            })
                        })
                    }
                });
            }

        }

        if (indices) {

            this.bufferViews.indices = {};

            Object.keys(indices).forEach(key => {

                if (indices[key] instanceof ElementBufferView) {

                    this.bufferViews.indices[key] = indices[key];

                } else {
                    this.bufferViews.indices[key] = new ElementBufferView({
                        buffer: new Buffer({
                            data: new Uint32Array(indices[key]),
                            target: 'ELEMENT_ARRAY_BUFFER'
                        }),
                        mode: 'TRIANGLES',
                        count: indices[key].length,
                        type: 'UNSIGNED_INT',
                        offset: 0
                    });
                }

            });
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