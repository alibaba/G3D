function main(
    G3D,
    { canvas, requestAnimationFrame, controlRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 80;
    camera.beta = 55;
    camera.radius = 10;

    // controlRotateCamera(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    const mesh = G3D.MeshBuilder.createCube(scene, 1);
    decMaterial(mesh);

    const coord = G3D.MeshBuilder.createCoordinate(scene, 20);

    function decMaterial(mesh) {
        mesh.materials.default.ambientColor = { r: 200, g: 100, b: 100 };
        mesh.materials.default.diffuseColor = { r: 200, g: 100, b: 100 };
        mesh.materials.default.specularColor = { r: 200, g: 100, b: 100 };
        mesh.materials.default.phongFactor = 0.5;
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

    let isDragging = false;
    let meshPosCache = null;
    let mousePosCache = null;

    canvas.addEventListener('mousedown', function (e) {
        const { offsetX: x, offsetY: y } = e;
        const id = scene.pick(x, y);
        if (id === mesh.id) {
            isDragging = true;
            meshPosCache = { ...mesh.position };

            const ray = camera.getViewRay(x, y);
            const pt = ray.intersectPlane({ normal: { x: 0, y: 1, z: 0 }, offset: 0 });

            mousePosCache = { ...pt };
        }
    });

    canvas.addEventListener('mouseup', function () {
        isDragging = false;
        meshPosCache = null;
        mousePosCache = null;
    })

    canvas.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const { offsetX: x, offsetY: y } = e;

            const ray = camera.getViewRay(x, y);
            const pt = ray.intersectPlane({ normal: { x: 0, y: 1, z: 0 }, offset: 0 });

            const dx = pt.x - mousePosCache.x;
            const dz = pt.z - mousePosCache.z;

            mesh.position.x = meshPosCache.x + dx;
            mesh.position.z = meshPosCache.z + dz;
        }


    })
}

export default main;