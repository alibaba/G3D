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
        camera.alpha = 30;
        camera.beta = 30;
        camera.radius = 60;

        controlArcRotateCamera(canvas, camera);

        const light1 = new G3D.DirectionalLight(scene);
        light1.direction.x = 1;
        light1.direction.y = 0;
        light1.direction.z = 1;
        light1.intensity = 0.6;
        const light2 = new G3D.DirectionalLight(scene);
        light2.direction.x = -1;
        light2.direction.y = 0;
        light2.direction.z = 1;
        light2.intensity = 0.6;
        const light3 = new G3D.AmbientLight(scene);
        light3.intensity = 0.5;

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

        // lambert
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

        // lambert
        const m8 = G3D.MeshBuilder.createCube(scene, 6);
        makeLambertTexture(m8);
        makePosition(m8, -5, -15);

        new G3D.MeshBuilder.createCoordinate(scene, 40);

        function makeLambert(mesh) {
            mesh.materials.default.ambientColor.r = 100;
            mesh.materials.default.ambientColor.g = 200;
            mesh.materials.default.ambientColor.b = 100;
            mesh.materials.default.diffuseColor.r = 100;
            mesh.materials.default.diffuseColor.g = 200;
            mesh.materials.default.diffuseColor.b = 100;
        }
        function makeLambertTexture(mesh) {
            mesh.materials.default.ambientTexture.image = image;
            mesh.materials.default.ambientSource = G3D.Material.TEXTURE;
            mesh.materials.default.diffuseTexture.image = image;
            mesh.materials.default.diffuseSource = G3D.Material.TEXTURE;
        }
        function makePhong(mesh, glossiness) {
            mesh.materials.default.ambientColor.r = 50;
            mesh.materials.default.ambientColor.g = 100;
            mesh.materials.default.ambientColor.b = 50;
            mesh.materials.default.diffuseColor.r = 50;
            mesh.materials.default.diffuseColor.g = 100;
            mesh.materials.default.diffuseColor.b = 50;
            mesh.materials.default.specularColor.r = 100;
            mesh.materials.default.specularColor.g = 200;
            mesh.materials.default.specularColor.b = 100;
            mesh.materials.default.glossiness = glossiness;
        }
        function makePhongTexture(mesh, glossiness) {
            mesh.materials.default.ambientTexture.image = image;
            mesh.materials.default.ambientSource = G3D.Material.TEXTURE;
            mesh.materials.default.diffuseTexture.image = image;
            mesh.materials.default.diffuseSource = G3D.Material.TEXTURE;
            mesh.materials.default.specularTexture.image = image;
            mesh.materials.default.specularSource = G3D.Material.TEXTURE;
            mesh.materials.default.phongFactor = glossiness;
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