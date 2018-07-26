function run(G3D, canvas, utils) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);

    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    utils.control(canvas, camera);

    const coordinate = G3D.MeshBuilder.createCoordinate(scene, 20);
    const mesh = G3D.MeshBuilder.createSphere(scene, 3, 32, 32);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    
    mesh.materials.default.diffuseColor = { r: 100, g: 100, b: 100 };
    mesh.materials.default.specularColor = { r: 100, g: 100, b: 100 };

    const lightA = new G3D.AmbientLight(scene);
    lightA.intensity = 1.0;
    mesh.materials.default.ambientColor = { r: 100, g: 100, b: 100 };

    utils.loader.loadImage(
        'https://img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg',
        function (image) {
            const texture = new G3D.Texture();
            texture.image = image;
            mesh.materials.default.specularEnvMapTexture = texture;
            mesh.materials.default.glossiness = 0.2;
        }
    )

    return function () {
        scene.render();
    }
}