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
    const mesh = G3D.MeshBuilder.createSphere(scene, 3, 32, 32);
    
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = 1;
    light1.direction.z = 1;

    Object.assign(mesh.materials.default.diffuseColor, { r: 100, g: 100, b: 100 });
    Object.assign(mesh.materials.default.specularColor, { r: 100, g: 100, b: 100 });
    Object.assign(mesh.materials.default, {glossiness: 2});

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 1.0;
    Object.assign(mesh.materials.default.ambientColor, {r: 100, g: 100, b: 100});

    loadImage(
        'https://img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg',
        function (image) {
            mesh.materials.default.envMapTexture.image = image;
            mesh.materials.default.useEnvMap = true;
        }
    )

    return function () {
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