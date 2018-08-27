@Lazy(
    ['vertices', 'indices'],
    ['getBuffers']
)
class LineGeometry {
    vertices = [];
    indices = {};

    constructor() {
    }

    destroy() {

    }

    getBuffers() {

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