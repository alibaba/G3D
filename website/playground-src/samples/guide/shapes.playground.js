function run(G3D, canvas) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 5;
    camera.fov = 60;
    camera.near = 0.0001;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;

    const light2 = new G3D.HemisphereLight(scene);

    const coordinate = G3D.MeshBuilder.createCoordinate(scene, 10);

    let mesh;
    mesh = G3D.MeshBuilder.createSphere(scene, 1);
    // mesh = G3D.MeshBuilder.createGround(scene, 2, 1);
    // mesh = G3D.MeshBuilder.createCylinder(scene, 1, 1);
    // mesh = G3D.MeshBuilder.createCone(scene, 1, 1);
    // mesh = G3D.MeshBuilder.createCube(scene, 1);

    if (mesh) {
        Object.assign(mesh.materials.default.diffuseColor, { r: 200, g: 100, b: 100 });
        Object.assign(mesh.materials.default.specularColor, { r: 200, g: 100, b: 100 });
        mesh.materials.default.glossiness = 10;
    }

    return function () {
        camera.beta = Math.sin(Date.now()/1000)*90;
        scene.render();
    }
}