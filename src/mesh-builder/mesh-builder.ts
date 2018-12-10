import createBox from "./primitives/box";
import createCone from "./primitives/cone";
import createCoordinate from "./primitives/coordinate";
import createCylinder from "./primitives/cylinder";
import createPlane from "./primitives/plane";
import createSphere from "./primitives/sphere";

import { createLineFromPath, createMeshFromPath } from "./models/font";
import createMeshFromGLTF from "./models/gltf";
import createFromObjModel from "./models/obj";
import createFromStlModel from "./models/stl";

export default {

    createSphere,
    createPlane,
    createCylinder,
    createCone,
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
    createMeshFromPath,
};
