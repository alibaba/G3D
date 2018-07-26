function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 5;
    camera.fov = 60;
    camera.near = 0.0001;
    utils.control(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 0, z: 2 };
    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    G3D.MeshBuilder.createCoordinate(scene, 10);


    const mesh = G3D.MeshBuilder.createSphere(scene, 1, 64, 64);
    // const mesh = G3D.MeshBuilder.createGround(scene, 3, 2);
    // const mesh = G3D.MeshBuilder.createCylinder(scene, 1, 1);
    // const mesh = G3D.MeshBuilder.createCone(scene, 1, 1);
    // const mesh = G3D.MeshBuilder.createCube(scene, 1);

    return function () {
        scene.render();
    }
}