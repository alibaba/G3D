import createSphere from './primitives/sphere';
import createPlane from './primitives/plane';
import createBox from './primitives/box';
import createCylinder from './primitives/cylinder';
import createCone from './primitives/cone';
import createCoordinate from './primitives/coordinate';

import createFromObjModel from './models/obj';
import createFromStlModel from './models/stl';
import { createLineFromPath, createMeshFromPath } from './models/font';
import createMeshFromGLTF from './models/gltf';

export default {

    createSphere,
    createPlane,
    createCylinder,
    createCone,
    createGround: (...args) => {
        console.log(
            '[Deprecation Warning] createGround is renamed to createPlane, the createGround method will be removed the next major version.'
        );
        return createPlane(...args);
    },
    createCube: (scene, width, height = width, depth = width) => {
        const w = width / 2;
        const h = height / 2;
        const d = depth / 2;
        return createBox(scene, -w, w, h, -h, d, -d);
    },
    createCoordinate,

    createFromObjModel,
    createFromStlModel,
    createMeshFromGLTF,

    createLineFromPath,
    createMeshFromPath
}