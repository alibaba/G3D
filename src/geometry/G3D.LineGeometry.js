class LineGeometry {

    bufferViews = {};

    facing = Geometry.BOTH;

    constructor({ vertices, indices } = {}) {

        if (vertices) {

            this.bufferViews.vertices = new BufferView({
                buffer: new Buffer({
                    data: new Float32Array(vertices),
                    target: 'ARRAY_BUFFER'
                })
            })

            {
                const normals = [];
                for (let i = 0; i < vertices.length; i += 3) {
                    normals.push(0, 0, 1);
                }

                this.bufferViews.normals = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(normals),
                        target: 'ARRAY_BUFFER'
                    })
                })
            }

            {
                const uvs = [];
                for (let i = 0; i < vertices.length; i += 3) {
                    uvs.push(0, 0);
                }

                this.bufferViews.uvs = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(uvs),
                        target: 'ARRAY_BUFFER'
                    })
                });
            }


            {
                this.bufferViews.indices = {}
                for (let key in indices) {

                    this.bufferViews.indices[key] = new ElementBufferView({
                        buffer: new Buffer({
                            data: new Uint32Array(indices[key]),
                            target: 'ELEMENT_ARRAY_BUFFER'
                        }),
                        mode: 'LINES',
                        count: indices[key].length,
                        type: 'UNSIGNED_INT',
                        offset: 0
                    })
                }
            }

        }
    }

    getBuffers() {

        return;

        const vertices = new BufferView({
            buffer: new Buffer({
                data: new Float32Array(this.vertices),
                target: 'ARRAY_BUFFER'
            })
        })

        const indices = {};
        const oUVs = [];
        const oNormals = [];

        for (let i = 0; i < this.vertices.length; i += 3) {
            oUVs.push(0, 0);
            oNormals.push(0, 0, 1);
        }

        const uvs = new BufferView({

            buffer: new Buffer({
                data: new Float32Array(oUVs),
                target: 'ARRAY_BUFFER'
            })

        })

        const normals = new BufferView({
            buffer: new Buffer({
                data: new Float32Array(oNormals),
                target: 'ARRAY_BUFFER'
            })
        })

        for (let key in this.indices) {

            indices[key] = {
                buffer: new Buffer({
                    data: new Uint32Array(this.indices[key]),
                    target: 'ELEMENT_ARRAY_BUFFER'
                }).glBuffer,
                mode: 'LINES',
                count: this.indices[key].length,
                type: 'UNSIGNED_INT',
                offset: 0
            }
        }

        return {
            vertices,
            uvs,
            normals,
            indices
        }
    }
}

export default LineGeometry;