function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 5;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: -1, y: 0, z: 1 };
    light1.intensity = 0.5;

    const light2 = new G3D.DirectionalLight(scene);
    light2.direction = { x: 1, y: 0, z: 1 };
    light2.intensity = 0.5;

    const light3 = new G3D.DirectionalLight(scene);
    light3.direction = { x: 0, y: 0, z: -1 };
    light3.intensity = 0.5;

    const light4 = new G3D.AmbientLight(scene);
    light4.intensity = 0.5;

    const mesh = G3D.MeshBuilder.createSphere(scene, 1, 256, 128);
    mesh.materials.default.ambientColor = { r: 150, g: 150, b: 150 };
    mesh.materials.default.diffuseColor = { r: 150, g: 150, b: 150 };
    mesh.materials.default.specularColor = { r: 200, g: 200, b: 200 };
    mesh.materials.default.glossiness = 1;

    G3D.MeshBuilder.createCoordinate(scene, 2);

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

    loader.loadImage('//img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg', image => {
        const texture = new G3D.Texture({image, flipY: true});
        mesh.materials.default.specularEnvMapTexture = texture;
    });

}

export default main;