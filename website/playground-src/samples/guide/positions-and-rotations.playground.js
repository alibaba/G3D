function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;
    utils.control(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 0, z: 2 };
    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    // create coordinate: X axis is the red line, Y the green, Z the blue
    const coord = G3D.MeshBuilder.createCoordinate(scene, 20);

    const mesh = G3D.MeshBuilder.createCube(scene, 1);

    // init mesh position
    // mesh.position = {x: 3, y: 0, z: 0};

    // init mesh rotation
    // mesh.rotation = {x: 45, y: 0, z: 0};

    // init mesh scale
    // mesh.scale = {x: 2, y: 1, z: 1};

    return function () {

        // rotate camera for viewing the scene
        // camera.alpha += 1;

        // translate mesh animation
        // mesh.position.x += 0.005;

        // rotate mesh animation
        // mesh.rotation.x += 1;

        // scale mesh animation
        // mesh.scale.x *= 1.01;

        scene.render();
    }
}