@Lazy(
    [],
    ['getBuffers']
)
class LineGeometry {
    vertices = [];  // vec3
    indices = {
        default: []  // vec2
    };

    mesh = null;

    constructor(mesh) {
        this.mesh = mesh;
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
        const engine = this.mesh.scene.engine;

        const oVertices = this.getVertices();

        const vertices = engine.createAttributeBuffer(oVertices);
        const indices = {};
        const indicesLength = {};
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
            indicesLength[key] = oIndices[key].length;
        }
        return {
            vertices, indices, indicesLength, uvs, normals
        }
    }
}

export default LineGeometry;