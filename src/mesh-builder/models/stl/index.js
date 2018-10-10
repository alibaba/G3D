import STLParser from './parser';

function createFromStlModel(scene, model, { geometry = {} } = {}) {

    model = STLParser.parse(model);

    const mesh = new Mesh(scene);

    mesh.geometry = new Geometry({
        vertices: model.positions,
        uvs: model.uvs,
        normals: model.normals,
        indices: {
            default: model.indices
        },
        ...geometry
    });

    return mesh;
}

export default createFromStlModel;