@Lazy(
    [
        'normals'
    ],
    [
        'getBuffers'
    ]
)
class Geometry {

    vertices = [];  // vec3
    indices = {
        default: []  // vec2
    };
    uvs = [];       // vec2
    normals = [];   // vec3

    constructor(mesh) {
        this.mesh = mesh;
    }

    getVertices() {
        return new Float32Array(this.vertices);
    }

    getUVs() {
        return new Float32Array(this.uvs);
    }

    getNormals() {
        return new Float32Array(this.normals);
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

        const vertices = engine.createAttributeBuffer(this.getVertices());
        const uvs = engine.createAttributeBuffer(this.getUVs());
        const normals = engine.createAttributeBuffer(this.getNormals());
        const indices = {};
        const indicesLength = {};

        const oIndices = this.getIndices();
        for (let key in oIndices) {
            indices[key] = engine.createElementBuffer(oIndices[key]);
            indicesLength[key] = oIndices[key].length;
        }
        return {
            vertices, uvs, normals, indices, indicesLength
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