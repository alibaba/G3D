import Engine from "../G3D.Engine";

const parse = (gltf, scene) => {

    console.log(gltf);

    const glBuffers = gltf.bufferViews.map((bv) => {

        const { data } = gltf.buffers[bv.buffer];

        const sliced = data.slice(
            bv.byteOffset,
            bv.byteOffset + bv.byteLength
        );

        return Engine.instance.createBuffer(sliced, bv.target);

    });

    const meshes = gltf.meshes.map((item, i) => {

        const mesh = new Mesh(scene);

        const { primitives } = item;
        const { attributes, indices, mode } = primitives[0];

        const getBuffer = (accessorKey) => {

            const accessor = gltf.accessors[accessorKey];

            return {
                buffer: glBuffers[accessor.bufferView],
                stride: accessor.byteStride || 0,
                offset: accessor.byteOffset || 0,
                count: accessor.count
            }
        };

        mesh.geometry.getBuffers = () => {

            return {
                vertices: getBuffer(attributes['POSITION']),
                normals: getBuffer(attributes['NORMAL']),
                uvs: getBuffer(attributes['TEXCOORD_0']),
                indices: {
                    default: {
                        ...getBuffer(indices),
                        mode: 'TRIANGLES',
                        type: 'UNSIGNED_SHORT'
                    }
                }
            }
        }

        // mesh.materials.default = new RawMaterial();

        return mesh;
    });

}

export default { parse };