function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 25;
    camera.beta = 45;
    camera.radius = 20;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.PointLight(scene);
    light1.radius = 2;
    light1.intensity = 0.3;

    const m1 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m1.materials.default = new G3D.RawMaterial(m1);
    m1.position.z = 1;

    const light2 = new G3D.PointLight(scene);
    light2.radius = 2;
    light2.position.x = 3;
    light2.intensity = 0.3;

    const m2 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m2.materials.default = new G3D.RawMaterial(m2);
    m2.position.z = 1;
    m2.position.x = 3;

    const light3 = new G3D.PointLight(scene);
    light3.radius = 2;
    light3.position.x = -3;
    light3.intensity = 0.3;

    const light4 = new G3D.AmbientLight(scene);
    light4.intensity = 0.2;

    const m3 = new G3D.MeshBuilder.createSphere(scene, 0.2);
    m3.materials.default = new G3D.RawMaterial(m3);
    m3.position.z = 1;
    m3.position.x = -3;

    const ground = G3D.MeshBuilder.createPlane(scene, 12, 8);

    function render() {

        const now = Date.now();

        m1.position.z = light1.position.z = Math.sin(now / 500 + Math.PI * 2 / 3) * 1.5 + 3;
        m2.position.z = light2.position.z = Math.sin(now / 500 + Math.PI * 4 / 3) * 1.5 + 3;
        m3.position.z = light3.position.z = Math.sin(now / 500) * 1.5 + 3;

        scene.render();
        requestAnimationFrame(render);
    }
    render();


}

export default main;