function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 6;
    camera.far = 50;

    controlArcRotateCamera(canvas, camera);

    const light = new G3D.DirectionalLight(scene);
    light.direction = { x: 0, y: 0, z: 10 };

    light.intensity = 1;

    light.castShadow = true;

    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -3;
    decorateMaterial(m1.materials.default);

    const m2 = G3D.MeshBuilder.createGround(scene, 0.5);
    m2.position.z = 0;
    decorateMaterial(m2.materials.default);

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

    function render() {
        m2.rotation.z += 1;
        scene.render();
        requestAnimationFrame(render);
    }
    render();

    canvas.addEventListener('click', e => {
        const { offsetX: x, offsetY: y } = e;
        console.log(scene.pickF(x, y, null));
    })

}

export default main;