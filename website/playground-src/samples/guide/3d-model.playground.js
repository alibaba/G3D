function run(G3D, canvas, loader) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);

    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 6;
    camera.fov = 60;

    // create 3 lights
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;

    const light2 = new G3D.HemisphereLight(scene);

    // load 3d model and create mesh
    let mesh = null;
    loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.obj', function (obj) {
        loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.mtl', function (mtl) {
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