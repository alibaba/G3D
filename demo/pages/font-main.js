function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);
    scene.clearColor = { r: 0, g: 0, b: 0 };

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 700;
    camera.far = 10000;

    controlArcRotateCamera(canvas, camera);

    // const light1 = new G3D.DirectionalLight(scene);
    // light1.direction.x = -1;
    // light1.direction.y = 0;
    // light1.direction.z = 1;
    // light1.intensity = 0.5;

    // const light2 = new G3D.HemisphereLight(scene);
    // light2.intensity = 0.5;

    // const light3 = new G3D.AmbientLight(scene);
    // light3.intensity = 0.2;


    const { vertices, indices } = PathParser.parseToLine();

    const line = new G3D.LineMesh(scene);
    line.geometry.vertices.push(...vertices);
    line.geometry.indices.default.push(...indices);
    line.position.x = -350;
    line.position.y = -350;

    const { vertices: mv, indices: mi } = PathParser.parseToTriangles();
    const mesh = new G3D.Mesh(scene);
    mesh.geometry.vertices = mv;
    mesh.geometry.normals = mv.map(item => 0);
    mesh.geometry.uvs = mv.map(item => 0);
    mesh.geometry.indices.default.push(...mi);
    mesh.materials.default = new G3D.RawMaterial(mesh);
    mesh.position.x = -350;
    mesh.position.y = -350;

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;