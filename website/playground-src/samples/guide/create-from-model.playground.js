function run(G3D, canvas, utils) {

    const engine = new G3D.Engine(canvas);
    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 3;
    camera.near = 0.0001;
    utils.control(canvas, camera);

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 10, y: 1, z: 1 };
    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    G3D.MeshBuilder.createCoordinate(scene, 10);

    function createTriangleFromObjModel() {

        const objStr = `
            # Alias OBJ Model File
            # File units = meters
            mtllib triangle.mtl
            usemtl FrontColor
            v 0 0 1
            vt -27.8388 -16.0728
            vn 0.57735 0.57735 0.57735
            v 0 1 0
            vt 27.8388 -16.0728
            v 1 0 0
            vt 0 32.1455
            f 1/1/1 2/2/1 3/3/1
        `;

        const mtlStr = `
            # Alias OBJ Material File
            newmtl FrontColor
            Ka 0.200000 0.200000 0.200000
            Kd 0.800000 0.800000 0.800000
            Ks 0.500000 0.500000 0.500000
        `;

        return G3D.MeshBuilder.createFromObjModel(scene, { obj: objStr, mtl: mtlStr });
    }
    const mesh = createTriangleFromObjModel();

    return function () {
        scene.render();
    }
}