function run(G3D, canvas, utils){

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);
    
    // create camera
    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 8;
    // click and drag on the canvas to control camera
    utils.control(canvas, camera);
    
    // create a directional light
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = {x: 1, y: 0, z: 1};
    light1.intensity = 0.5;

    // create a ambient light
    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;
    
    // create a plane
    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -1;

    // create a sphere
    const m2 = G3D.MeshBuilder.createSphere(scene, 1);
    m2.position.z = 1;
    
    return function () {
        scene.render();
    }
}