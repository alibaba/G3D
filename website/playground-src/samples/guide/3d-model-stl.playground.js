function run(G3D, canvas, loader) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 78;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = 1;
    light1.direction.z = 1;
    light1.intensity = 1.0;

    const light2 = new G3D.DirectionalLight(scene);
    light2.direction.x = -1;
    light2.direction.y = 0;
    light2.direction.z = 1;
    light2.intensity = 0.5;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.1;

    // load 3d model and create mesh
    let mesh = null;
    loader.loadBlob(
        /*it's stl, ignore the png trick*/
        'https://g.alicdn.com/gama/assets/0.0.2/assets/models/g3d-banner/venus_print.stl.obj.png',
        function (content) {
            mesh = G3D.MeshBuilder.createFromStlModel(scene, content);
            mesh.position.y = -50;
            mesh.rotation.x = -90;
            mesh.rotation.y = 90;

            const attachColor = function (mesh, r, g, b) {
                mesh.materials.default.ambientColor.r = r;
                mesh.materials.default.ambientColor.g = g;
                mesh.materials.default.ambientColor.b = b;
                mesh.materials.default.diffuseColor.r = r;
                mesh.materials.default.diffuseColor.g = g;
                mesh.materials.default.diffuseColor.b = b;
            };
            attachColor(mesh, 230, 230, 230);
        }
    )

    return function () {
        if (mesh) {
            mesh.rotation.y += 1;
        }
        scene.render();
    }
}