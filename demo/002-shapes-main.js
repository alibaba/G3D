function main(
    G3D,
    { canvas, requestAnimationFrame }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 15;
    camera.beta = 25;
    camera.radius = 10;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 0, y: 1, z: 1 };
    light1.intensity = 0.3;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    const attachColor = function (mesh, r, g, b) {
        mesh.materials.default.ambientColor = { r, g, b };
        mesh.materials.default.diffuseColor = { r, g, b };
        mesh.materials.default.specularColor = { r, g, b };
        mesh.materials.default.glossiness = 10;
    }

    const cube = G3D.MeshBuilder.createCube(scene, 1.3);
    const sphere = G3D.MeshBuilder.createSphere(scene, 1);
    const cylinder = G3D.MeshBuilder.createCylinder(scene, 0.8, 1.3);
    const cone = G3D.MeshBuilder.createCone(scene, 0.7, 1.6);

    const coord = G3D.MeshBuilder.createCoordinate(scene, 10);

    cube.position.x = 3;
    sphere.position.x = -3;
    cylinder.position.z = -3;
    cone.position.z = 3;
    cone.position.y = -0.1;

    attachColor(cube, 52, 152, 219);
    attachColor(sphere, 46, 204, 133);
    attachColor(cylinder, 155, 89, 182);
    attachColor(cone, 230, 126, 34);

    function render() {
        cube.rotation.y += 1;
        sphere.rotation.y += 1;
        cylinder.rotation.x += 0.9;
        cylinder.rotation.y += 1.17;
        cone.rotation.z += 1;
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;