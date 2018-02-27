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

    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);

    mesh.materials.default = new G3D.RawMaterial(mesh);
    Object.assign(mesh.materials.default.color, { r: 200, g: 100, b: 100 });

    function loadImage(url, callback) {
        const image = new G3D.Env.Image();
        image.crossOrigin = true;
        image.onload = function () {
            callback(image);
        }
        image.src = url;
    }

    // loadImage(
    //     'https://img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png',
    //     function (image) {
    //         mesh.materials.default.texture.image = image;
    //         mesh.materials.default.source = G3D.Material.TEXTURE;
    //     }
    // )

    return function () {
        mesh.rotation.y += 1;
        scene.render();
    }
}