function run(G3D, canvas){

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);
    
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    
    const light2 = new G3D.HemisphereLight(scene);

    const coord = G3D.MeshBuilder.createCoordinate(scene, 20);
    
    const mesh = G3D.MeshBuilder.createCube(scene, 1);

    Object.assign(mesh.materials.default.diffuseColor, {r: 200, g: 100, b: 100});
    Object.assign(mesh.materials.default.specularColor, {r: 200, g: 100, b: 100});
    mesh.materials.default.glossiness = 10;

    // init mesh position
    // Object.assign(mesh.position, {x: 3, y: 0, z: 0});

    // init mesh rotation
    // Object.assign(mesh.rotation, {x: 45, y: 0, z: 0});

    // init mesh scale
    // Object.assign(mesh.scale, {x: 2, y: 1, z: 1});
    
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