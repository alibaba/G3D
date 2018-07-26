function run(G3D, canvas, utils){

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);
    
    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    utils.control(canvas, camera);
    
    const light1 = new G3D.AmbientLight(scene);
    light1.color = {r: 255, g: 255, b: 255};
    
    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    
    mesh.materials.default.ambientColor = {r: 200, g: 0, b: 0};
    mesh.materials.default.diffuseColor = {r: 0, g: 200, b: 0};
    mesh.materials.default.specularColor = {r: 0, g: 0, b: 200};
    
    return function () {
        mesh.rotation.y +=1;
        scene.render();
    }
}