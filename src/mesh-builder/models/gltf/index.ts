import PBREnviroment from '../../../material/G3D.PBREnviroment';
import Buffer from '../../../core/G3D.Buffer';
import PBRMaterial from '../../../material/G3D.PBRMaterial';
import Texture from '../../../texture/G3D.Texture';
import Mesh from '../../../mesh/G3D.Mesh';
import Mat4_2 from '../../../matrix/G3D.Mat4';
import Vec3 from '../../../matrix/G3D.Vec3';
import Quat_2 from '../../../matrix/G3D.Quat';
import BufferView from '../../../core/G3D.BufferView';
import ElementBufferView from '../../../core/G3D.ElementBufferView';
import Geometry from '../../../geometry/G3D.Geometry';

const Mat4: any = Mat4_2;
const Quat: any = Quat_2;

function createMeshFromGLTF(scene, gltf, { specular, diffuse, lut }) {

    const pbrEnv = new PBREnviroment({ diffuse, specular, brdfLUT: lut });

    const gBuffers = gltf.bufferViews.map((bv) => {

        const { data } = gltf.buffers[bv.buffer];

        return new Buffer({
            data: data.slice(bv.byteOffset, bv.byteOffset + bv.byteLength),
            target: bv.target
        });

    });

    const gTextureCache = [];
    const gTextureCreators = gltf.textures.map((tex, i) => {

        return (sRGB = false) => {
            if (!gTextureCache[i]) {
                const image = gltf.images[tex.source].data;
                const texture = new Texture({ image, sRGB, flipY: false, repeat: true });
                gTextureCache[i] = texture;
            }
            return gTextureCache[i];
        };
    });

    const gMaterials = gltf.materials.map(mtl => {

        const material: any = new PBRMaterial();

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
            material.albedoTexture = gTextureCreators[mr.baseColorTexture.index](true);
            material.albedoTexture.sRGB = true;

            material.gltfAlbedoTexCoord = mr.baseColorTexture.texCoord || 0;
        }

        if (mr.metallicRoughnessTexture) {
            material.metallicRoughnessTexture = gTextureCreators[mr.metallicRoughnessTexture.index]();
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
            material.emissiveTexture = gTextureCreators[emissiveTexture.index](true);
            material.emissiveTexture.sRGB = true;
            material.gltfEmissiveTexCoord = emissiveTexture.texCoord || 0;
        }

        if (normalTexture) {
            material.normalTexture = gTextureCreators[normalTexture.index]();
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
                const material = mesh.materials.default as any;

                const uvs = {} as any;

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
                    buffer: gBuffers[accessor.bufferView],
                    stride: accessor.byteStride || 0,
                    offset: accessor.byteOffset || 0,
                });

            }

            function getElementBufferView(accessorKey) {

                const accessor = gltf.accessors[accessorKey];

                return new ElementBufferView({
                    buffer: gBuffers[accessor.bufferView],
                    offset: accessor.byteOffset || 0,
                    count: accessor.count,
                    mode: 'TRIANGLES',
                    type: 'UNSIGNED_SHORT',
                })
            }

            return mesh;

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