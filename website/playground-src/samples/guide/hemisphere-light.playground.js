function run(G3D, canvas) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);

    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 5;
    camera.beta = 
    camera.radius = 12;
    camera.fov = 60;

    const light1 = new G3D.HemisphereLight(scene);
    Object.assign(light1.sky, { r: 255, g: 0, b: 0 });
    Object.assign(light1.ground, { r: 0, g: 255, b: 0 });

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    // create mesh
    const mesh = G3D.MeshBuilder.createSphere(scene, 3, 64, 32);

    const lightFlag = G3D.MeshBuilder.createSphere(scene, 0.2);
    lightFlag.materials.default = new G3D.RawMaterial(lightFlag);

    const coord = G3D.MeshBuilder.createCoordinate(scene, 20);

    Object.assign(mesh.materials.default.diffuseColor, { r: 200, g: 200, b: 200 });
    Object.assign(mesh.materials.default.specularColor, { r: 200, g: 200, b: 200 });
    mesh.materials.default.glossiness = 10;

    return function () {

        light1.up.x = Math.sin(Date.now()/500);
        light1.up.z = Math.cos(Date.now()/500);
        light1.up.y = 1;
        lightFlag.position.x = light1.up.x*4.0;
        lightFlag.position.y = light1.up.y*4.0;
        lightFlag.position.z = light1.up.z*4.0;
        
        scene.render();
    }
}