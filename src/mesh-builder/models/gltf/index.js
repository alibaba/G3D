function createMeshFromGLTF(scene, gltf, { specular, diffuse, lut }) {

    const pbrEnv = new PBREnviroment({ diffuse, specular, brdfLUT: lut });

    const glBuffers = gltf.bufferViews.map((bv) => {

        const { data } = gltf.buffers[bv.buffer];

        return new Buffer({
            data: data.slice(bv.byteOffset, bv.byteOffset + bv.byteLength),
            target: bv.target
        });

    });

    const gTextures = gltf.textures.map(tex => {

        const image = gltf.images[tex.source].data;

        const texture = new Texture({ image, sRGB: false, flipY: false, repeat: true });

        return texture;
    });

    const gMaterials = gltf.materials.map(mtl => {

        const material = new PBRMaterial();

        const { pbrMetallicRoughness: mr, normalTexture, emissiveTexture } = mtl;

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
            material.albedoTexture.sRGB = true;

            material.gltfAlbedoTexCoord = mr.baseColorTexture.texCoord || 0;
        }

        if (mr.metallicRoughnessTexture) {
            material.metallicRoughnessTexture = gTextures[mr.metallicRoughnessTexture.index];
            material.metallic = 1.0;
            material.roughness = 1.0;

            material.gltfMetallicRoughnessTexCoord = mr.metallicRoughnessTexture.texCoord || 0;
        }

        if (typeof mr.metallicFactor === 'number') {
            material.metallic = mr.metallicFactor;
        } else {
            material.metallic = 1.0;
        }
        if (typeof mr.roughnessFactor === 'number') {
            material.roughness = mr.roughnessFactor;
        } else {
            material.roughness = 1.0;
        }


        if (emissiveTexture) {
            material.emissiveTexture = gTextures[emissiveTexture.index];
            material.emissiveTexture.sRGB = true;

            material.gltfEmissiveTexCoord = emissiveTexture.texCoord || 0;
        }

        if (normalTexture) {
            material.normalTexture = gTextures[normalTexture.index];

            material.gltfNormalTexCoord = normalTexture.texCoord || 0;
        }

        material.pbrEnviroment = pbrEnv;

        return material;
    });

    const gMeshCreators = gltf.meshes.map((item) => {

        return () => {

            const mesh = new Mesh(scene);

            const { primitives } = item;
            const { attributes, indices, mode, material: materialIndex } = primitives[0];

            mesh.materials.default = gMaterials[materialIndex];

            {
                const material = mesh.materials.default;

                const uvs = {};

                if (material.albedoTexture) {
                    uvs.aAlbedoUV = getBufferView(attributes[`TEXCOORD_${material.gltfAlbedoTexCoord}`]);
                }
                if (material.metallicRoughnessTexture) {
                    uvs.aMetallicRoughnessUV = getBufferView(attributes[`TEXCOORD_${material.gltfMetallicRoughnessTexCoord}`]);
                }
                if (material.normalTexture) {
                    uvs.aNormalUV = getBufferView(attributes[`TEXCOORD_${material.gltfNormalTexCoord}`]);
                }
                if (material.emissiveTexture) {
                    uvs.aEmissiveUV = getBufferView(attributes[`TEXCOORD_${material.gltfEmissiveTexCoord}`]);
                };



                mesh.geometry = new Geometry({
                    vertices: getBufferView(attributes['POSITION']),
                    normals: getBufferView(attributes['NORMAL']),
                    uvs: uvs,
                    indices: {
                        default: getElementBufferView(indices)
                    }
                });
            }


            function getBufferView(accessorKey) {

                const accessor = gltf.accessors[accessorKey];

                return new BufferView({
                    buffer: glBuffers[accessor.bufferView],
                    stride: accessor.byteStride || 0,
                    offset: accessor.byteOffset || 0,
                    count: accessor.count
                });

            }

            function getElementBufferView(accessorKey) {

                const accessor = gltf.accessors[accessorKey];

                return new ElementBufferView({
                    buffer: glBuffers[accessor.bufferView],
                    offset: accessor.byteOffset || 0,
                    count: accessor.count,
                    mode: 'TRIANGLES',
                    type: 'UNSIGNED_SHORT',
                })
            }

            return mesh;

            // const getBuffer = (accessorKey) => {

            //     const accessor = gltf.accessors[accessorKey];

            //     return {
            //         buffer: glBuffers[accessor.bufferView],
            //         stride: accessor.byteStride || 0,
            //         offset: accessor.byteOffset || 0,
            //         count: accessor.count
            //     }
            // };

            // mesh.geometry.getBuffers = () => {

            //     const material = mesh.materials.default;

            //     const uvs = {};

            //     if (material.albedoTexture) {
            //         uvs.aAlbedoUV = getBuffer(attributes[`TEXCOORD_${material.gltfAlbedoTexCoord}`]);
            //     }
            //     if (material.metallicRoughnessTexture) {
            //         uvs.aMetallicRoughnessUV = getBuffer(attributes[`TEXCOORD_${material.gltfMetallicRoughnessTexCoord}`]);
            //     }
            //     if (material.normalTexture) {
            //         uvs.aNormalUV = getBuffer(attributes[`TEXCOORD_${material.gltfNormalTexCoord}`]);
            //     }
            //     if (material.emissiveTexture) {
            //         uvs.aEmissiveUV = getBuffer(attributes[`TEXCOORD_${material.gltfEmissiveTexCoord}`]);
            //     }

            //     const buffers = {
            //         vertices: getBuffer(attributes['POSITION']),
            //         normals: getBuffer(attributes['NORMAL']),
            //         uvs: uvs,
            //         indices: {
            //             default: {
            //                 ...getBuffer(indices),
            //                 mode: 'TRIANGLES',
            //                 type: 'UNSIGNED_SHORT'
            //             }
            //         }
            //     };


            //     return buffers;
            // }

            // mesh.materials.default = gMaterials[materialIndex];

            // return mesh;
        }

    });

    const gMeshes = gltf.nodes.map((item, i) => {

        const mesh = (item.mesh !== undefined) ? gMeshCreators[item.mesh]() : new Mesh(scene);

        if (item.matrix) {

            const mMatrix = Mat4.fromValues(...item.matrix);

            const trans = Mat4.getTranslation(Vec3.create(), mMatrix);
            const quat = Mat4.getRotation(Quat.create(), mMatrix);
            const euler = Quat.getEuler(Vec3.create(), quat);
            const scale = Mat4.getScaling(Vec3.create(), mMatrix);

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

        }
        return mesh;
    });

    gltf.nodes.forEach((item, i) => {
        if (item.children) {
            item.children.forEach(c => {
                gMeshes[c].parent = gMeshes[i];
            })
        }
    });

    return gMeshes.filter(m => !m.parent);
}

export default createMeshFromGLTF;