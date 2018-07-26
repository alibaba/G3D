function main(
    G3D,
    {canvas, requestAnimationFrame, controlArcRotateCamera}
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 8;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -1;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1);
    m2.position.z = 1;

    function render(){
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;