import Mesh from '../../../mesh/G3D.Mesh';
import Geometry from '../../../geometry/G3D.Geometry';

import PhongMaterial from '../../../material/G3D.PhongMaterial';
import Texture from '../../../texture/G3D.Texture';
import Env from '../../../core/G3D.Env';

import OBJParser from './parser';

function flatten(arr) {
    const res = [];
    arr.forEach(a => res.push(...a));
    return res;
}


function createFromObjModel(scene, model) {

    model = OBJParser.parse(model);

    const vertices = flatten(model.positions);
    const uvs = flatten(model.uvs);
    const normals = flatten(model.normals);
    const indices = {};
    const materials = {};

    for (let key in model.indices) {

        const mtl = model.mtls[key];

        if (!mtl) {

            indices['default'] = model.indices[key];

        } else {

            indices[key] = model.indices[key];

            if (!materials[key]) {
                materials[key] = new PhongMaterial();
            }

            if (mtl.ambientColor) {
                materials[key].ambientColor = {
                    r: mtl.ambientColor[0] * 255,
                    g: mtl.ambientColor[1] * 255,
                    b: mtl.ambientColor[2] * 255,
                }
            }
            if (mtl.ambientTexture) {
                const image = new Env.Image();
                image.crossOrigin = true;
                image.onload = function () {
                    const texture = new Texture({ image });
                    materials[key].ambientTexture = texture;
                }
                image.src = mtl.ambientTexture;
            }

            if (mtl.diffuseColor) {
                materials[key].diffuseColor = {
                    r: mtl.diffuseColor[0] * 255,
                    g: mtl.diffuseColor[1] * 255,
                    b: mtl.diffuseColor[2] * 255,
                }
            }
            if (mtl.diffuseTexture) {
                const image = new Env.Image();
                image.crossOrigin = true;
                image.onload = function () {
                    const texture = new Texture({ image, flipY: true });
                    materials[key].diffuseTexture = texture;
                }
                image.src = mtl.diffuseTexture;
            }

            if (mtl.specularColor) {
                materials[key].specularColor = {
                    r: mtl.specularColor[0] * 255,
                    g: mtl.specularColor[1] * 255,
                    b: mtl.specularColor[2] * 255
                }
            }
            if (mtl.specularTexture) {
                const image = new Env.Image();
                image.crossOrigin = true;
                image.onload = function () {
                    const texture = new Texture({ Image });
                    materials[key].specularTexture = texture;
                }
                image.src = mtl.specularTexture;
            }
        }
    }

    const mesh = new Mesh(scene);

    mesh.geometry = new Geometry({
        vertices,
        normals,
        uvs,
        indices
    });
    mesh.materials = materials;

    return mesh;
}

export default createFromObjModel;