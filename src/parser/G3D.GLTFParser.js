const parse = (gltf, scene, { specular, diffuse, lut }) => {

    console.log(gltf);

    const glBuffers = gltf.bufferViews.map((bv) => {

        const { data } = gltf.buffers[bv.buffer];

        const sliced = data.slice(
            bv.byteOffset,
            bv.byteOffset + bv.byteLength
        );

        return Engine.instance.createBuffer(sliced, bv.target);

    });

    const pbrEnv = new PBREnviroment();
    pbrEnv.specular.images = specular;
    pbrEnv.diffuse.images = diffuse;
    pbrEnv.brdfLUT.image = lut;


    const gTextures = gltf.textures.map(tex => {

        const image = gltf.images[tex.source].data;

        const texture = new Texture();

        texture.image = image;
        texture.flipY = false;
        texture.sRGB = false;

        return texture;
    });

    const gMaterials = gltf.materials.map(mtl => {

        const material = new PBRMaterial();

        const { pbrMetallicRoughness: mr } = mtl;

        if (mr.baseColorFactor) {
            material.albedoColor = {
                r: mr.baseColorFactor[0] * 255,
                g: mr.baseColorFactor[1] * 255,
                b: mr.baseColorFactor[2] * 255
            }
        } else {
            material.albedoColor = {
                r: 255,
                g: 255,
                b: 255
            }
        }

        if (mr.baseColorTexture) {
            material.albedoTexture = gTextures[mr.baseColorTexture.index];
            material.albedoSource = Material.TEXTURE;
        }

        if (mr.metallicRoughnessTexture) {
            material.useMetallicRoughnessTexture = true;
            material.metallicRoughnessTexture = gTextures[mr.metallicRoughnessTexture.index];
            material.metallic = 1.0;
            material.roughness = 1.0;
        } else {
            material.metallic = 0.9;
            material.roughness = 0.2;
        }

        material.pbrEnviroment = pbrEnv;

        return material;
    });

    // const material = new PBRMaterial();
    // material.pbrEnviroment = pbrEnv;

    // material.albedoColor = { r: 148, g: 148, b: 148 };
    // material.metallic = 0.5;
    // material.roughtness = 0.99;

    const meshes = gltf.meshes.map((item, i) => {

        const mesh = new Mesh(scene);

        const { primitives } = item;
        const { attributes, indices, mode, material: materialIndex } = primitives[0];

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
                uvs: {
                    aAlbedoUV: getBuffer(attributes['TEXCOORD_0']),
                    aMetallicRoughnessUV: getBuffer(attributes['TEXCOORD_0'])
                },
                indices: {
                    default: {
                        ...getBuffer(indices),
                        mode: 'TRIANGLES',
                        type: 'UNSIGNED_SHORT'
                    }
                }
            }
        }

        mesh.materials.default = gMaterials[materialIndex];

        return mesh;
    });

}

export default { parse };