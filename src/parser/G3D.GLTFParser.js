

const parse = (gltf, scene, { specular, diffuse, lut }) => {

    console.log(gltf);

    const glBuffers = gltf.bufferViews.map((bv) => {

        if (bv.target) {
            const { data } = gltf.buffers[bv.buffer];

            const sliced = data.slice(
                bv.byteOffset,
                bv.byteOffset + bv.byteLength
            );

            return Engine.instance.createBuffer(sliced, bv.target);

        } else {

            return null;

        }

    });

    // gltf.images.forEach(item => {

    //     if (item.bufferView) {
    //         const buffer = glBuffers[item.bufferView];


    //     }

    // });


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

    const gMeshCreators = gltf.meshes.map((item) => {

        return () => {

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
                    uvs: attributes['TEXCOORD_0'] ? {
                        aAlbedoUV: getBuffer(attributes['TEXCOORD_0']),
                        aMetallicRoughnessUV: getBuffer(attributes['TEXCOORD_0'])
                    } : null,
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

        }

    });

    const gMeshes = gltf.nodes.map((item, i) => {

        const mesh = (item.mesh !== undefined) ? gMeshCreators[item.mesh]() : new Mesh(scene);

        if (item.matrix) {

            console.log(item.matrix);

            const mMatrix = Mat4.fromValues(...item.matrix);

            const trans = Mat4.getTranslation(Vec3.create(), mMatrix);
            const quat = Mat4.getRotation(Quat.create(), mMatrix);
            const euler = Quat.getEuler(Vec3.create(), quat);
            const scale = Mat4.getScaling(Vec3.create(), mMatrix);

            console.log('trans, quat, euler, scale');
            console.log(trans, quat, euler, scale);

            mesh.position = {
                x: trans[0],
                y: trans[1],
                z: trans[2]
            };

            mesh.rotation = {
                x: euler[0],
                y: euler[1],
                z: euler[2]
            };

            mesh.scale = {
                x: scale[0],
                y: scale[1],
                z: scale[2]
            }

            console.log(mesh.getMatrix());

        }
        return mesh;
    });

    gltf.nodes.map((item, i) => {
        if (item.children) {
            item.children.forEach(c => {
                gMeshes[c].parent = gMeshes[i];
            })
        }
    });

}

export default { parse };