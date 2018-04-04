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

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 10.0;

    const light2 = new G3D.DirectionalLight(scene);
    light2.direction.x = 1;
    light2.direction.y = 0;
    light2.direction.z = 1;
    light2.intensity = 10.0;

    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -1;
    pbrMaterial(m1);

    const m2 = G3D.MeshBuilder.createSphere(scene, 1, 100, 100);
    m2.position.z = 1;
    pbrMaterial(m2);

    function pbrMaterial(mesh) {

        mesh.materials.default = new G3D.PBRMaterial(mesh);

        mesh.materials.default.albedoColor = {r: 255, g: 197, b: 152};
        mesh.materials.default.metallic = true;
        mesh.materials.default.roughness = 0.1;
        
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();


}

export default main;