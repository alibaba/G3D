function main(
    G3D,
    {canvas, requestAnimationFrame, controlArcRotateCamera}
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotateOrthographicCamera(scene);
    camera.alpha = 0;
    camera.beta = 45;
    camera.radius = 10;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = 1;
    light1.direction.y = -1;
    light1.direction.z = 1;
    light1.intensity = 1.5;

    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -1;
    // m1.rotation.x = 90;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1, 32);
    m2.position.z = 1;

    const coord = G3D.MeshBuilder.createCoordinate(scene, 10);

    function render(){
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;