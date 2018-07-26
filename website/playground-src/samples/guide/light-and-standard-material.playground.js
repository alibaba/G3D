function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    utils.control(canvas, camera);


    G3D.MeshBuilder.createCoordinate(scene, 20);

    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    // const mesh = G3D.MeshBuilder.createSphere(scene, 3);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = {x: 1, y: 1, z: 1};
    
    mesh.materials.default.diffuseColor = { r: 200, g: 150, b: 150 };
    mesh.materials.default.specularColor = { r: 200, g: 150, b: 150 };
    mesh.materials.default.glossiness = 2;

    // const light2 = new G3D.AmbientLight(scene);
    // light2.intensity = 1.0;
    // Object.assign(mesh.materials.default.ambientColor, {r: 200, g: 100, b: 100});

    utils.loader.loadImage(
        'https://img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png',
        function (image) {
            // mesh.materials.default.diffuseTexture.image = image;
            // mesh.materials.default.diffuseSource = G3D.Material.TEXTURE;

            // mesh.materials.default.ambientTexture.image = image;
            // mesh.materials.default.ambientSource = G3D.Material.TEXTURE;
        }
    )

    return function () {
        mesh.rotation.y += 1;
        scene.render();
    }
}