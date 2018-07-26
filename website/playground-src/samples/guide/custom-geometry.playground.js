function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 5;
    camera.near = 0.0001;
    utils.control(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 0, z: 2 };
    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    G3D.MeshBuilder.createCoordinate(scene, 10);

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
            'default': [
                0, 1, 2
            ]
        };

        return mesh;
    }
    
    createCustomTriangleMesh();

    return function () {
        camera.alpha += 1;
        scene.render();
    }
}