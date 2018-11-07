function main(
    G3D,
    { canvas, requestAnimationFrame, controlRotateCamera, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 20;
    camera.beta = 30;
    camera.radius = 8;

    controlRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 1.5;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;

    let mesh = null;
    loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.obj', function (obj) {
        loader.loadText('https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.mtl', function (mtl) {
            mesh = G3D.MeshBuilder.createFromObjModel(scene, { obj, mtl });
        })
    })

    function render() {
        if (mesh) {
            mesh.rotation.y += 1;
        }
        scene.render();
        requestAnimationFrame(render);
    }
    render();
}

export default main;