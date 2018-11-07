function main(
    G3D,
    { canvas, requestAnimationFrame, controlRotateCamera }
) {

    const image = new G3D.Env.Image();
    image.crossOrigin = true;

    image.onload = function () {

        const engine = new G3D.Engine(canvas);

        const scene = new G3D.Scene(engine);

        const camera = new G3D.RotatePerspectiveCamera(scene);
        camera.alpha = 30;
        camera.beta = 30;
        camera.radius = 60;

        controlRotateCamera(canvas, camera);

        const light1 = new G3D.DirectionalLight(scene);
        light1.direction = { x: 1, y: 0, z: 1 };
        light1.intensity = 0.4;

        const light2 = new G3D.DirectionalLight(scene);
        light2.direction = { x: -1, y: 0, z: 1 };
        light2.intensity = 0.4;

        const light3 = new G3D.AmbientLight(scene);
        light3.intensity = 0.2;

        // lambert
        const m1 = G3D.MeshBuilder.createSphere(scene, 4);
        makeLambert(m1);
        makePosition(m1, 5, 15);

        // phong
        const m2 = G3D.MeshBuilder.createSphere(scene, 4);
        makePhong(m2, 3);
        makePosition(m2, 5, 5);

        const m3 = G3D.MeshBuilder.createSphere(scene, 4);
        makePhong(m3, 20);
        makePosition(m3, 5, -5);

        // lambert texture
        const m4 = G3D.MeshBuilder.createSphere(scene, 4);
        makeLambertTexture(m4);
        makePosition(m4, 5, -15);

        // lambert
        const m5 = G3D.MeshBuilder.createCube(scene, 6);
        makeLambert(m5);
        makePosition(m5, -5, 15);

        // phong
        const m6 = G3D.MeshBuilder.createCube(scene, 6);
        makePhong(m6, 3);
        makePosition(m6, -5, 5);

        const m7 = G3D.MeshBuilder.createCube(scene, 6);
        makePhong(m7, 20);
        makePosition(m7, -5, -5);

        // lambert texture
        const m8 = G3D.MeshBuilder.createCube(scene, 6);
        makeLambertTexture(m8);
        makePosition(m8, -5, -15);

        new G3D.MeshBuilder.createCoordinate(scene, 40);

        function makeLambert(mesh) {
            mesh.materials.default.ambientColor = { r: 100, g: 200, b: 100 };
            mesh.materials.default.diffuseColor = { r: 100, g: 200, b: 100 };
            mesh.materials.default.specularColor = { r: 0, g: 0, b: 0 };
        }
        function makeLambertTexture(mesh) {
            const texture = new G3D.Texture({ image });
            mesh.materials.default.ambientTexture = texture;
            mesh.materials.default.diffuseTexture = texture;
            mesh.materials.default.specularColor = { r: 0, g: 0, b: 0 };
        }
        function makePhong(mesh, glossiness) {
            mesh.materials.default.ambientColor = { r: 50, g: 100, b: 50 };
            mesh.materials.default.diffuseColor = { r: 50, g: 100, b: 50 };
            mesh.materials.default.specularColor = { r: 100, g: 200, b: 100 };
            mesh.materials.default.glossiness = glossiness;
        }


        function makePosition(mesh, x, y) {
            mesh.position.x = x;
            mesh.position.y = y;
        }

        function rotate(mesh) {
            mesh.rotation.x += 0.3;
            mesh.rotation.y += 0.3;
        }

        function render() {
            rotate(m5);
            rotate(m6);
            rotate(m7);
            rotate(m8);

            scene.render();
            requestAnimationFrame(render);
        }
        render();
    }
    image.src = '//img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png';

}

export default main;