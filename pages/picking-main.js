function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = -60;
    camera.beta = 30;
    camera.radius = 10;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    const m1 = G3D.MeshBuilder.createGround(scene, 3, 3);
    decMaterial(m1);
    m1.position.z = -2;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1.2);
    decMaterial(m2);
    m2.position.z = 2;

    const m3 = G3D.MeshBuilder.createCube(scene, 1);
    decMaterial(m3);
    m3.position.x = 2;


    function decMaterial (mesh){
        mesh.materials.default.ambientColor.r = 200;
        mesh.materials.default.ambientColor.g = 100;
        mesh.materials.default.ambientColor.b = 100;
        mesh.materials.default.diffuseColor.r = 200;
        mesh.materials.default.diffuseColor.g = 100;
        mesh.materials.default.diffuseColor.b = 100;
        mesh.materials.default.specularColor.r = 200;
        mesh.materials.default.specularColor.g = 100;
        mesh.materials.default.specularColor.b = 100;
        mesh.materials.default.phongFactor = 0.5;
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

    const meshes = [m1, m2, m3];

    const findById = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
    }

    const toggleMesh = (mesh) => {
        if (mesh.materials.default.diffuseColor.g === 100) {
            mesh.materials.default.diffuseColor.g = 200;
            mesh.materials.default.specularColor.g = 200;
            mesh.materials.default.ambientColor.g = 200;           
        } else {
            mesh.materials.default.diffuseColor.g = 100;
            mesh.materials.default.specularColor.g = 100;
            mesh.materials.default.ambientColor.g = 100;
        }
    }

    canvas.addEventListener('click', function (e) {
        const { offsetX: x, offsetY: y } = e;
        const id = scene.pick(x, y);
        const mesh = findById(meshes, id);
        if (mesh) {
            toggleMesh(mesh);
        }
    });
}

export default main;