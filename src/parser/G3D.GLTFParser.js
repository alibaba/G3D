import MeshBuilder from "../mesh/G3D.MeshBuilder";

const parse = (gltf, scene) => {
    console.log(gltf);

    const meshes = gltf.meshes.map(item => {

        const mesh = new Mesh(scene);

        const { primitives, name } = item;

        // only support one primitive
        const { attributes, indices, mode } = primitives[0];




    });




}


export default { parse };