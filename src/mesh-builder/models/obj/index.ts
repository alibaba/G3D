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
                materials[key].ambientTexture = new Texture({ image: mtl.ambientTexture });
            }

            if (mtl.diffuseColor) {
                materials[key].diffuseColor = {
                    r: mtl.diffuseColor[0] * 255,
                    g: mtl.diffuseColor[1] * 255,
                    b: mtl.diffuseColor[2] * 255,
                }
            }
            if (mtl.diffuseTexture) {
                materials[key].diffuseTexture = new Texture({ image: mtl.diffuseTexture, flipY: true });
            }

            if (mtl.specularColor) {
                materials[key].specularColor = {
                    r: mtl.specularColor[0] * 255,
                    g: mtl.specularColor[1] * 255,
                    b: mtl.specularColor[2] * 255
                }
            }
            if (mtl.specularTexture) {
                materials[key].specularTexture = new Texture({ image: mtl.specularTexture });
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
    mesh.materials = materials as any;

    return mesh;
}

export default createFromObjModel;