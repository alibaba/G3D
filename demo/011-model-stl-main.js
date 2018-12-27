function main(
    G3D,
    { canvas, requestAnimationFrame, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 20;
    camera.radius = 160;
    camera.far = 400;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 0.6;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.3;

    G3D.MeshBuilder.createCoordinate(scene, 6000);

    loader.loadText(
        'http://g.alicdn.com/gama/assets/0.0.20/assets/models/stl/venus_print-ascii.txt',
        function (text) {
            const mesh = G3D.MeshBuilder.createFromStlModel(scene, text);
            mesh.rotation.x = 270;
            mesh.rotation.y = 180;
            mesh.position.y = -50;

            function render() {
                mesh.rotation.y += 0.5;
                scene.render();
                requestAnimationFrame(render);
            }
            render();
        }
    )
}

export default main;