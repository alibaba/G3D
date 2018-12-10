function main(
    G3D,
    { canvas, requestAnimationFrame, onClickCanvas }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = -60;
    camera.beta = 30;
    camera.radius = 6;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = {x: -1, y: 0, z: 1};
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    const m1 = G3D.MeshBuilder.createPlane(scene, 3, 3);
    m1.position.z = -2;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1.2, 128, 128);
    m2.position.z = 2;

    const m3 = G3D.MeshBuilder.createCube(scene, 1);
    m3.position.x = 2;

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();

    const meshes = [m1, m2, m3];

    const findById = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
    }

    const rawMaterial = new G3D.RawMaterial();
    rawMaterial.color = {r: 100, g: 200, b: 50};
    const phongMaterial = new G3D.PhongMaterial();

    const toggleMesh = (mesh) => {
        if(mesh.materials.default instanceof G3D.PhongMaterial){
            mesh.materials.default = rawMaterial;
        }else{
            mesh.materials.default = phongMaterial;
        }
    }

    onClickCanvas(function (e) {
        const { offsetX: x, offsetY: y } = e;
        const id = scene.pick(x, y);
        const mesh = findById(meshes, id);
        if (mesh) {
            toggleMesh(mesh);
        }
    });
}

export default main;