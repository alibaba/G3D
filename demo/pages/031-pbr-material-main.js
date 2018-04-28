function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader, pbrAssets }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    scene.clearColor = { r: 51, g: 51, b: 76 };

    const camera = new G3D.ArcRotateCamera(scene)
    camera.fov = 60;
    camera.near = 0.01;
    camera.far = 100;
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 16;

    controlArcRotateCamera(canvas, camera);

    function createLight(x, y, z) {
        const light = new G3D.DirectionalLight(scene);
        light.direction.x = x;
        light.direction.y = y;
        light.direction.z = z;
        light.intensity = 1.0;
    }

    createLight(0, 0.5, 0.5);

    const m3 = G3D.MeshBuilder.createCoordinate(scene, 5);

    pbrAssets.ready((specular, diffuse) => {

        const size = 4;

        createBalls([200, 200, 200], 1);
        createBalls([218, 179, 0], -1);

        function createBalls(color, z = 1) {

            for (let r = 0; r < size; r++) {

                for (let m = 0; m < size; m++) {

                    const mesh = G3D.MeshBuilder.createSphere(scene, 1, 30, 30);
                    mesh.position.x = (r - (size - 1) / 2) * 2.5;
                    mesh.position.y = (m - (size - 1) / 2) * 2.5;
                    mesh.position.z = z * 1.5;

                    const mtl = new G3D.PBRMaterial();

                    Object.assign(mtl.specularMapTexture.images, specular);
                    Object.assign(mtl.diffuseMapTexture.images, diffuse);

                    mtl.albedoColor = {r: color[0], g: color[1], b: color[2]};

                    mtl.metallic = m / (size - 1);
                    mtl.roughness = r / (size - 1);

                    mesh.materials.default = mtl;
                }
            }

        }




    })

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;