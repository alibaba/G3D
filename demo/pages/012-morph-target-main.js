function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);

    camera.center.y = 1200;
    camera.alpha = 70;
    camera.beta = 15;
    camera.radius = 2800;

    camera.near = 1;
    camera.far = 30000;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = 1;
    light1.direction.z = 1;
    light1.intensity = 0.5;

    const light2 = new G3D.HemisphereLight(scene);
    light2.intensity = 0.5;

    let mesh = null;
    loader.loadText(
        'https://g.alicdn.com/gama/assets/0.0.3/assets/models/goose/index.json',
        function (content) {
            const model = JSON.parse(content);
            mesh = G3D.MeshBuilder.createFromG3DModel(scene, model);
        }
    );

    function tick() {
        if (mesh) {
            mesh.rotation.y = Math.sin(Date.now() / 3000) * 75;
        }
        scene.render();

        requestAnimationFrame(tick);
    }

    tick();



}

export default main;