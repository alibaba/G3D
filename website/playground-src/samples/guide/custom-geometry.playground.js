function run(G3D, canvas) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 5;
    camera.fov = 60;
    camera.near = 0.0001;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;

    const light2 = new G3D.HemisphereLight(scene);

    const coordinate = G3D.MeshBuilder.createCoordinate(scene, 10);

    function createCustomTriangleMesh() {
        const mesh = new G3D.Mesh(scene);

        mesh.geometry.vertices = [
            2, 0, 0,
            0, 2, 0,
            0, 0, 2
        ];
        mesh.geometry.uvs = [0, 0, 0, 0, 0, 0];
        mesh.geometry.normals = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1
        ];
        mesh.geometry.indices = {
            foo: [
                0, 1, 2
            ]
        };

        delete mesh.materials.default;
        mesh.materials.foo = new G3D.StandardMaterial(mesh);

        Object.assign(mesh.materials.foo.diffuseColor, { r: 200, g: 100, b: 100 });
        Object.assign(mesh.materials.foo.specularColor, { r: 200, g: 100, b: 100 });
        mesh.materials.foo.glossiness = 10;

    }
    const mesh = createCustomTriangleMesh();

    return function () {
        camera.alpha += 1;
        scene.render();
    }
}