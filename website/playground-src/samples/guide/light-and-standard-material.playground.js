function run(G3D, canvas) {

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);

    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;



    const coordinate = G3D.MeshBuilder.createCoordinate(scene, 20);

    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    // const mesh = G3D.MeshBuilder.createSphere(scene, 3);
    
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = 1;
    light1.direction.z = 1;
    Object.assign(mesh.materials.default.diffuseColor, { r: 200, g: 100, b: 100 });
    Object.assign(mesh.materials.default.specularColor, { r: 200, g: 100, b: 100 });
    Object.assign(mesh.materials.default, {glossiness: 2});

    // const light2 = new G3D.AmbientLight(scene);
    // light2.intensity = 1.0;
    // Object.assign(mesh.materials.default.ambientColor, {r: 200, g: 100, b: 100});

    loadImage(
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

    function loadImage(url, callback) {
        const image = new G3D.Env.Image();
        image.crossOrigin = true;
        image.onload = function () {
            callback(image);
        }
        image.src = url;
    }
}