function run(G3D, canvas, utils) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);


    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 6;
    utils.control(canvas, camera);


    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = {x: 1, y: 1, z: 0};

    const light2 = new G3D.DirectionalLight(scene);
    light2.direction = {x: 0, y: 1, z: 1};

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 1.5;

    // load 3d model and create mesh
    let mesh = null;
    utils.loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.obj', function (obj) {
        utils.loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.mtl', function (mtl) {
            mesh = G3D.MeshBuilder.createFromObjModel(scene, {obj, mtl});
        })
    })

    return function () {
        if(mesh){
            mesh.rotation.y += 1;
        }
        scene.render();
    }
}