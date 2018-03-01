function run(G3D, canvas) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);

    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 0;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;

    // create 3 lights
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0.5;
    light1.direction.z = 1;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.3;

    // create mesh
    const mesh = G3D.MeshBuilder.createCylinder(scene, 2, 4, 64);

    const lightFlag = G3D.MeshBuilder.createSphere(scene, 0.2);
    lightFlag.materials.default = new G3D.RawMaterial(mesh);

    const coord = G3D.MeshBuilder.createCoordinate(scene, 10);

    Object.assign(mesh.materials.default.ambientColor, { r: 200, g: 100, b: 100 });
    Object.assign(mesh.materials.default.diffuseColor, { r: 200, g: 100, b: 100 });
    Object.assign(mesh.materials.default.specularColor, { r: 200, g: 100, b: 100 });
    mesh.materials.default.glossiness = 10;

    return function () {
        light1.direction.x = Math.sin(Date.now() / 1000) * 1.0;

        lightFlag.position.x = light1.direction.x*3.0;
        lightFlag.position.y = light1.direction.y*3.0;
        lightFlag.position.z = light1.direction.z*3.0;
        
        scene.render();
    }
}