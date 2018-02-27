function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const image = new G3D.Env.Image();
    image.crossOrigin = true;
    image.onload = function () {

        const engine = new G3D.Engine(canvas);

        const scene = new G3D.Scene(engine);

        const camera = new G3D.ArcRotateCamera(scene);
        camera.alpha = 45;
        camera.beta = 30;
        camera.radius = 5;

        controlArcRotateCamera(canvas, camera);

        const light1 = new G3D.DirectionalLight(scene);
        light1.direction.x = -1;
        light1.direction.y = 0;
        light1.direction.z = 1;
        light1.intensity = 0.5;
        const light2 = new G3D.DirectionalLight(scene);
        light2.direction.x = 1;
        light2.direction.y = 0;
        light2.direction.z = 1;
        light2.intensity = 0.5;
        const light3 = new G3D.DirectionalLight(scene);
        light3.direction.x = 0;
        light3.direction.y = 0;
        light3.direction.z = -1;
        light3.intensity = 0.5;

        const light4 = new G3D.AmbientLight(scene);
        light4.intensity = 0.5;

        const mesh = G3D.MeshBuilder.createSphere(scene, 1);
        mesh.materials.default.ambientColor.r = 150;
        mesh.materials.default.ambientColor.g = 150;
        mesh.materials.default.ambientColor.b = 150;
        mesh.materials.default.diffuseColor.r = 150;
        mesh.materials.default.diffuseColor.g = 150;
        mesh.materials.default.diffuseColor.b = 150;
        mesh.materials.default.specularColor.r = 200;
        mesh.materials.default.specularColor.g = 200;
        mesh.materials.default.specularColor.b = 200;
        mesh.materials.default.glossiness = 1;
        mesh.materials.default.useEnvMap = true;
        mesh.materials.default.envMapTexture.image = image;

        G3D.MeshBuilder.createCoordinate(scene, 2);

        function render() {
            scene.render();
            requestAnimationFrame(render);
        }
        render();
    };
    image.src = '//img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg';
}

export default main;