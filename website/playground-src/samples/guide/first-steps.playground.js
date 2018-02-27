function run(G3D, canvas){

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);
    
    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;
    
    // create 3 lights
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    
    const light2 = new G3D.HemisphereLight(scene);
    
    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    
    Object.assign(mesh.materials.default.diffuseColor, {r: 200, g: 100, b: 100});
    Object.assign(mesh.materials.default.specularColor, {r: 200, g: 100, b: 100});
    mesh.materials.default.glossiness = 10;
    
    return function () {
        mesh.rotation.y +=1;
        scene.render();
    }
}