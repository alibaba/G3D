@DirtyCheck(['vertices', 'uvs', 'normals', 'indices'], 'isDirty')
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

    @DirtyCache('isDirty', true)
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
    }

    mergeNormals2() {

        const hasMerged = [];
        const { vertices, normals } = this;

        for (let i = 0; i < vertices.length; i += 3) {
            if (!hasMerged[i]) {
                const indices = [i / 3];
                const normal = [normals[i], normals[i + 1], normals[i + 2]];
                for (let j = i + 3; j < i + vertices.length; j += 3) {
                    if (
                        vertices[i] === vertices[j] &&
                        vertices[i + 1] === vertices[j + 1] &&
                        vertices[i + 2] === vertices[j + 2]
                    ) {
                        indices.push(j / 3);
                        normal[0] += normals[j];
                        normal[1] += normals[j + 1];
                        normal[2] += normals[j + 2];
                    }
                }

                for (let k = 0; k < indices.length; k++) {
                    const idx = indices[k];
                    normals[idx * 3] = normal[0] / indices.length;
                    normals[idx * 3 + 1] = normal[1] / indices.length;
                    normals[idx * 3 + 2] = normal[2] / indices.length;
                    hasMerged[idx] = true;
                }
            }
        }
    }
}

export default Geometry;