function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);
    scene.clearColor = { r: 0, g: 0, b: 0 };

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 0;
    camera.beta = 5;
    camera.radius = 2500;
    camera.far = 10000;
    camera.fov = 120;

    controlArcRotateCamera(canvas, camera);

    const light0 = new G3D.AmbientLight(scene);
    light0.intensity = 0.7;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = 1;
    light1.direction.z = 1;
    light1.intensity = 1.5;

    const light2 = new G3D.DirectionalLight(scene);
    light2.direction.x = -1;
    light2.direction.y = -1;
    light2.direction.z = -1;
    light2.intensity = 1.5;

    G3D.MeshBuilder.createCoordinate(scene, 6000);

    loader.loadText('http://g.alicdn.com/gama/assets/0.0.6/assets/fonts-json/optimer.json', function (text) {

        const font = JSON.parse(text);

        createMesh('H', -2050, 500);
        createMesh('e', -1050, 500);
        createMesh('l', -300, 500);
        createMesh('l', 100, 500);
        createMesh('o', 500, 500);

        createMesh('G', -1000, -650);
        createMesh('3', 0, -650);
        createMesh('D', 700, -650);

        function createMesh(char, x, y) {

            const path = font.glyphs[char].o;

            const line = G3D.MeshBuilder.createLineFromPath(scene, path, 20);
            const mesh = G3D.MeshBuilder.createMeshFromPath(scene, path, 100, 20);
            mesh.materials.default.ambientColor = { r: 100, g: 20, b: 20 };
            mesh.materials.default.diffuseColor = { r: 100, g: 20, b: 20 };
            mesh.materials.default.specularColor = { r: 100, g: 20, b: 20 };

            line.position.x = x;
            line.position.y = y;
            mesh.position.x = x;
            mesh.position.y = y;
        }

    })

    function render() {
        camera.alpha = Math.sin(Date.now() / 1000) * 55;
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;