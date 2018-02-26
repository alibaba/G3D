function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
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

    const obj = `
        # Alias OBJ Model File
        # File units = meters
        mtllib triangle.mtl
        usemtl FrontColor
        v 0 0 1
        vt -27.8388 -16.0728
        vn -0.57735 -0.57735 0.57735
        v 1 0 0
        vt 27.8388 -16.0728
        v 0 1 0
        vt 0 32.1455
        f 1/1/1 2/2/1 3/3/1
    `;

    const mtl = `
        # Alias OBJ Material File
        newmtl FrontColor
        Ka 0.000000 0.000000 0.000000
        Kd 0.882353 0.882353 0.784314
        Ks 0.330000 0.330000 0.330000
    `;

    const mesh = G3D.MeshBuilder.createFromObjModel(scene, {obj, mtl});

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();
}

export default main;