import GL from "../../../core/gl";
import Mat4 from "../../../matrix/mat4";
import Quat from "../../../matrix/quat";
import Vec3 from "../../../matrix/vec3";
import Vec4 from "../../../matrix/vec4";
import Scene from "../../../scene/scene";
import Buffer from "../../../buffer/buffer";
import BufferView from "../../../buffer/buffer-view";
import ElementBuffer from "../../../buffer/element-buffer";
import ElementBufferView from "../../../buffer/element-buffer-view";
import Mesh from "../../../mesh/mesh";
import Geometry from "../../../geometry/geometry";
import PBRMaterial from "../../../material/pbr-material";
import PBREnviroment from "../../../material/pbr-enviroment";
import Texture from "../../../texture/texture";

import { isPowerOf2 } from "../../../utils/math";

interface IGltfTexture {
    index: number;
    texCoord?: number;
    strength?: number;
}

interface IGltf {
    accessors: Array<{
        bufferView: number;
        byteOffset: number;
        byteStride?: number;
        componentType: number;
        count: number;
        max: number[];
        min: number[];
        name: string;
        type: string;
    }>;
    bufferViews: Array<{
        buffer: 0;
        byteLength: number;
        byteOffset: number;
        byteStride: number;
        name: string;
        target: number;
    }>;
    buffers: Array<{
        byteLength: number;
        data: ArrayBuffer;
        name: string;
    }>;
    images: Array<{
        data: HTMLImageElement;
        name: string;
    }>;
    materials: Array<{
        name: string;
        pbrMetallicRoughness: {
            baseColorFactor: number[];
            metallicFactor: number;
            roughnessFactor: number;
            metallicRoughnessTexture: IGltfTexture;
            baseColorTexture: IGltfTexture,
        };
        normalTexture: IGltfTexture;
        occlusionTexture: IGltfTexture;
        emissiveTexture: IGltfTexture;
        emissiveFactor: number[];
    }>;
    meshes: Array<{
        name: string;
        primitives: Array<{
            attributes: {
                NORMAL: number;
                POSITION: number;
            };
            indices: number;
            material: number;
            mode: number;
        }>;
    }>;
    nodes: Array<{
        name: string;
        mesh: number;
        children?: number[];
        matrix?: number[];
        translation?: number[];
        rotation?: number[];
        scale?: number[];
    }>;
    samplers: Array<{
        magFilter: number;
        minFilter: number;
        wrapS: number;
        wrapT: number;
    }>;
    textures: Array<{
        name: string;
        sampler: number;
        source: number;
    }>;
}

interface IGltfMaterialTexCoord {
    gltfAlbedoTexCoord?: number;
    gltfMetallicRoughnessTexCoord?: number;
    gltfEmissiveTexCoord?: number;
    gltfNormalTexCoord?: number;
    gltfOcclusionTexCoord?: number;
}

function createMeshFromGLTF(scene: Scene, gltf: IGltf, pbrEnv?: PBREnviroment) {

    const { gl } = GL;

    const getBuffer = (() => {

        function encode(i: number, isElement: boolean): string {
            return i + "_" + isElement.toString();
        }

        const buffers: Map<string, Buffer | ElementBuffer> = new Map();

        return (i: number, isElement: boolean = false): Buffer | ElementBuffer => {
            const bv = gltf.bufferViews[i];
            const { data } = gltf.buffers[bv.buffer];
            const key = encode(i, isElement);

            if (!buffers.get(key)) {
                if (isElement) {
                    const buffer = new ElementBuffer({
                        data: data.slice(bv.byteOffset, bv.byteOffset + bv.byteLength),
                    });
                    buffers.set(key, buffer);
                } else {
                    const buffer = new Buffer({
                        data: data.slice(bv.byteOffset, bv.byteOffset + bv.byteLength),
                    });
                    buffers.set(key, buffer);
                }
            }
            return buffers.get(key);
        };
    })();

    const getTexture = (() => {

        const textures: Map<string, Texture> = new Map();

        function encode(i: number, sRGB: boolean): string {
            return i + "_" + (!!sRGB).toString();
        }

        return (i: number, sRGB: boolean = false): Texture => {

            const key = encode(i, sRGB);

            if (!textures.get(key)) {
                const image = gltf.images[gltf.textures[i].source].data;
                const texture = new Texture({
                    image, sRGB, flipY: false,
                });
                textures.set(key, texture);
            }

            return textures.get(key);
        };
    })();

    const texCoordMap: Map<PBRMaterial, IGltfMaterialTexCoord> = new Map();

    const materials = gltf.materials.map((mtl) => {

        const material = new PBRMaterial();
        const texCoord: IGltfMaterialTexCoord = {};

        const { pbrMetallicRoughness: pbrMRInfo, normalTexture, emissiveTexture, occlusionTexture } = mtl;

        if (pbrMRInfo.baseColorFactor) {
            material.albedoColor = {
                r: pbrMRInfo.baseColorFactor[0] * 255,
                g: pbrMRInfo.baseColorFactor[1] * 255,
                b: pbrMRInfo.baseColorFactor[2] * 255,
            };
        } else {
            material.albedoColor = {
                r: 255,
                g: 255,
                b: 255,
            };
        }

        if (pbrMRInfo.baseColorTexture) {
            material.albedoTexture = getTexture(pbrMRInfo.baseColorTexture.index, true);
            texCoord.gltfAlbedoTexCoord = pbrMRInfo.baseColorTexture.texCoord || 0;
        }

        if (pbrMRInfo.metallicRoughnessTexture) {
            material.metallicRoughnessTexture = getTexture(pbrMRInfo.metallicRoughnessTexture.index, false);
            texCoord.gltfMetallicRoughnessTexCoord = pbrMRInfo.metallicRoughnessTexture.texCoord || 0;
        }

        if (typeof pbrMRInfo.metallicFactor === "number") {
            material.metallic = pbrMRInfo.metallicFactor;
        } else {
            material.metallic = 1.0;
        }

        if (typeof pbrMRInfo.roughnessFactor === "number") {
            material.roughness = pbrMRInfo.roughnessFactor;
        } else {
            material.roughness = 1.0;
        }

        if (emissiveTexture) {
            material.emissiveTexture = getTexture(emissiveTexture.index, true);
            texCoord.gltfEmissiveTexCoord = emissiveTexture.texCoord || 0;
        }

        if (occlusionTexture) {
            material.occlusionTexture = getTexture(occlusionTexture.index, false);
            material.occlusionStrength =
                typeof occlusionTexture.strength === "number" ? occlusionTexture.strength : 1.0;
            texCoord.gltfOcclusionTexCoord = occlusionTexture.texCoord || 0;
        }

        if (normalTexture) {
            material.normalTexture = getTexture(normalTexture.index, false);
            texCoord.gltfNormalTexCoord = normalTexture.texCoord || 0;
        }

        if (pbrEnv) {
            material.pbrEnviroment = pbrEnv;
        }

        texCoordMap.set(material, texCoord);

        return material;
    });

    const getMesh = (() => {

        return (i: number): Mesh => {

            const mesh = new Mesh(scene);

            const { primitives } = gltf.meshes[i];
            const { attributes, indices, mode, material: materialIndex } = primitives[0];

            const material = materials[materialIndex];

            {

                const uvs = {} as any;

                if (material.albedoTexture) {
                    uvs.aAlbedoUV = getBufferView(
                        attributes[`TEXCOORD_${texCoordMap.get(material).gltfAlbedoTexCoord}`],
                    );
                }
                if (material.metallicRoughnessTexture) {
                    uvs.aMetallicRoughnessUV = getBufferView(
                        attributes[`TEXCOORD_${texCoordMap.get(material).gltfMetallicRoughnessTexCoord}`],
                    );
                }
                if (material.normalTexture) {
                    uvs.aNormalUV = getBufferView(
                        attributes[`TEXCOORD_${texCoordMap.get(material).gltfNormalTexCoord}`],
                    );
                }
                if (material.occlusionTexture) {
                    uvs.aOcclusionUV = getBufferView(
                        attributes[`TEXCOORD_${texCoordMap.get(material).gltfOcclusionTexCoord}`],
                    );
                }
                if (material.emissiveTexture) {
                    uvs.aEmissiveUV = getBufferView(
                        attributes[`TEXCOORD_${texCoordMap.get(material).gltfEmissiveTexCoord}`],
                    );
                }

                mesh.geometry = new Geometry({
                    vertices: getBufferView(attributes.POSITION),
                    normals: getBufferView(attributes.NORMAL),
                    uvs,
                    indices: {
                        default: getElementBufferView(indices),
                    },
                });
            }

            mesh.materials.default = material;

            function getBufferView(accessorKey) {

                const accessor = gltf.accessors[accessorKey];

                const buffer = getBuffer(accessor.bufferView, false);

                return new BufferView({
                    buffer,
                    byteStride: accessor.byteStride || 0,
                    byteOffset: accessor.byteOffset || 0,
                });

            }

            function getElementBufferView(accessorKey) {

                const accessor = gltf.accessors[accessorKey];

                const buffer = getBuffer(accessor.bufferView, true) as ElementBuffer;

                return new ElementBufferView({
                    buffer,
                    byteOffset: accessor.byteOffset || 0,
                    count: accessor.count,
                    mode: "TRIANGLES",
                    type: "UNSIGNED_SHORT",
                });
            }

            return mesh;
        };
    })();

    const meshes = gltf.nodes.map((item, i) => {

        const mesh = (item.mesh !== undefined) ? getMesh(item.mesh) : new Mesh(scene);

        if (item.matrix) {

            const mMatrix = Mat4.fromValues(...item.matrix);

            const trans = Mat4.getTranslation(Vec3.create(), mMatrix);
            const quat = Mat4.getRotation(Quat.create(), mMatrix);
            const euler = Quat.getEuler(Vec3.create(), quat);
            const scale = Mat4.getScaling(Vec3.create(), mMatrix);

            mesh.position = {
                x: trans[0],
                y: trans[1],
                z: trans[2],
            };

            mesh.rotation = {
                x: euler[0],
                y: euler[1],
                z: euler[2],
            };

            mesh.scale = {
                x: scale[0],
                y: scale[1],
                z: scale[2],
            };

        } else {
            if (item.translation) {

                const trans = item.translation;
                mesh.position = {
                    x: trans[0],
                    y: trans[1],
                    z: trans[2],
                };

            }

            if (item.rotation) {

                const quat = Vec4.fromValues(...item.rotation);
                const euler = Quat.getEuler(Vec3.create(), quat);

                mesh.rotation = {
                    x: euler[0],
                    y: euler[1],
                    z: euler[2],
                };

            }

            if (item.scale) {

                const scale = item.scale;
                mesh.scale = {
                    x: scale[0],
                    y: scale[1],
                    z: scale[2],
                };

            }
        }

        return mesh;
    });

    gltf.nodes.forEach((item, i) => {
        if (item.children) {
            item.children.forEach((c) => {
                meshes[c].parent = meshes[i];
            });
        }
    });

    return meshes.filter((m) => !m.parent);
}

export default createMeshFromGLTF;
