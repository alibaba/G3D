function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    utils.control(canvas, camera);

    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    mesh.materials.default = new G3D.RawMaterial(mesh);

    mesh.materials.default.color = { r: 255, g: 255, b: 255 };

    utils.loader.loadImage(
        'https://img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png',
        function (image) {
            const texture = new G3D.Texture();
            texture.image = image;
            mesh.materials.default.texture = texture;
        }
    )

    return function () {
        mesh.rotation.y += 1;
        scene.render();
    }
}