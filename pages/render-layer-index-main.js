function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 20;
    camera.radius = 10;

    controlArcRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 0.5;

    const light2 = new G3D.HemisphereLight(scene);
    light2.intensity = 0.5;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;

    const m1 = G3D.MeshBuilder.createGround(scene, 6, 4);
    m1.position.z = -1;
    decorateMaterial(m1.materials.default, 100, 200, 100);

    const m2 = G3D.MeshBuilder.createSphere(scene, 1);
    m2.position.z = 1;
    m2.renderLayerIndex = 1;
    decorateMaterial(m2.materials.default);

    const m3 = G3D.MeshBuilder.createCoordinate(scene, 5);
    m3.renderLayerIndex = 2;

    function decorateMaterial(material, r = 200, g = 100, b = 100) {
        material.ambientColor.r = r;
        material.ambientColor.g = g;
        material.ambientColor.b = b;
        material.diffuseColor.r = r;
        material.diffuseColor.g = g;
        material.diffuseColor.b = b;
        material.specularColor.r = r;
        material.specularColor.g = g;
        material.specularColor.b = b;
        material.glossiness = 10;
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;