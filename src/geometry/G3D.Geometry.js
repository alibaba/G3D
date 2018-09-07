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

    bufferViews = null;

    constructor(data) {

        // if (data) {

        //     const bufferViews = this.bufferViews = {};

        //     const { vertices, indices, uvs, normals } = data;

        //     if(vertices instanceof Buffer)
        
        // }


        
    }

    getBuffers() {

        const vertices = this.vertices ? new BufferView({
            buffer: new Buffer({
                data: new Float32Array(this.vertices),
                target: 'ARRAY_BUFFER'
            })
        }) : null;

        const normals = this.normals ? new BufferView({
            buffer: new Buffer({
                data: new Float32Array(this.normals),
                target: 'ARRAY_BUFFER'
            })
        }) : null;

        let uvs = null;
        if (this.uvs) {
            uvs = {};
            if (typeof this.uvs.length === 'number') {
                uvs = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(this.uvs),
                        target: 'ARRAY_BUFFER'
                    })
                })
            } else {
                Object.keys(this.uvs).forEach(key => {
                    uvs[key] = new BufferView({
                        buffer: new Buffer({
                            data: new Float32Array(this.uvs[key]),
                            target: 'ARRAY_BUFFER'
                        })
                    })

                });
            }
        }

        const indices = {};
        Object.keys(this.indices).forEach(key => {

            indices[key] = this.indices[key] ? {
                buffer: new Buffer({
                    data: new Uint32Array(this.indices[key]),
                    target: 'ELEMENT_ARRAY_BUFFER'
                }).glBuffer,
                mode: 'TRIANGLES',
                count: this.indices[key].length,
                type: 'UNSIGNED_INT',
                offset: 0
            } : null;

            // indices[key] = this.indices[key] ? new ElementBufferView({
            //     buffer: new Buffer({
            //         data: new Uint32Array(this.indices[key]),
            //         target: 'ELEMENT_ARRAY_BUFFER'
            //     }),
            //     mode: 'TRIANGLES',
            //     count: this.indices[key].length,
            //     type: 'UNSIGNED_INT',
            //     offset: 0
            // }) : null;

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