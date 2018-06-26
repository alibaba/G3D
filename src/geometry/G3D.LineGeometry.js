@Lazy(
    [],
    ['getBuffers']
)
class LineGeometry {
    vertices = [];  // vec3
    indices = {
        default: []  // vec2
    };

    constructor() {
    }

    getVertices() {
        return new Float32Array(this.vertices);
    }

    getIndices() {
        const indices = { ...this.indices };
        for (let key in indices) {
            indices[key] = new Uint32Array(indices[key]);
        }
        return indices;
    }

    getBuffers() {
        const engine = Engine.instance;

        const oVertices = this.getVertices();

        const vertices = engine.createAttributeBuffer(oVertices);
        const indices = {};
        const oUVs = [];
        const oNormals = [];

        for (let i = 0; i < oVertices.length; i += 3) {
            oUVs.push(0, 0);
            oNormals.push(0, 0, 1);
        }

        const uvs = engine.createAttributeBuffer(new Float32Array(oUVs));
        const normals = engine.createAttributeBuffer(new Float32Array(oNormals));

        const oIndices = this.getIndices();
        for (let key in oIndices) {
            indices[key] = engine.createElementBuffer(oIndices[key]);

            indices[key] = {
                buffer: engine.createElementBuffer(oIndices[key]),
                mode: 'LINES',
                offset: 0,
                count: oIndices[key].length
            }
        }

        return {
            vertices: { buffer: vertices, stride: 0, offset: 0 },
            uvs: { buffer: uvs, stride: 0, offset: 0 },
            normals: { buffer: normals, stride: 0, offset: 0 },
            indices
        }
    }
}

export default LineGeometry;