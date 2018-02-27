function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 10;

    controlArcRotateCamera(canvas, camera);

    const l1 = new G3D.PointLight(scene);
    l1.radius = 2;
    const m1 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m1.materials.default = new G3D.RawMaterial(m1);
    m1.position.z = 1;

    const l2 = new G3D.PointLight(scene);
    l2.radius = 2;
    l2.position.x = 3;
    const m2 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m2.materials.default = new G3D.RawMaterial(m2);
    m2.position.z = 1;
    m2.position.x = 3;

    const l3 = new G3D.PointLight(scene);
    l3.radius = 2;
    l3.position.x = -3;
    const m3 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m3.materials.default = new G3D.RawMaterial(m3);
    m3.position.z = 1;
    m3.position.x = -3;

    const ground = G3D.MeshBuilder.createGround(scene, 12, 8);
    decorateMaterial(ground.materials.default);

    function decorateMaterial(material) {
        material.ambientColor.r = 200;
        material.ambientColor.g = 100;
        material.ambientColor.b = 100;
        material.diffuseColor.r = 200;
        material.diffuseColor.g = 100;
        material.diffuseColor.b = 100;
        material.specularColor.r = 200;
        material.specularColor.g = 100;
        material.specularColor.b = 100;
        material.glossiness = 10;
    }

    function decorateLightSource(material) {
        material.diffuseColor.r = 255;
        material.diffuseColor.g = 255;
        material.diffuseColor.b = 255;
    }

    function render() {

        const now = Date.now();

        m1.position.z = l1.position.z = Math.sin(now / 500 + Math.PI * 2 / 3) * 2 + 3;
        m2.position.z = l2.position.z = Math.sin(now / 500 + Math.PI * 4 / 3) * 2 + 3;
        m3.position.z = l3.position.z = Math.sin(now / 500) * 2 + 3;

        scene.render();
        requestAnimationFrame(render);
    }
    render();


}

export default main;