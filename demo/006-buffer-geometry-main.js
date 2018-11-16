function main(
    G3D,
    { canvas, requestAnimationFrame }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 20;
    camera.radius = 7;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: -1, y: 0, z: 1 };
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    G3D.MeshBuilder.createCoordinate(scene, 4);

    const vertices = [
        1, 1, 1, 99,
        1, 0, 0, 99,
        1, 1, 0, 99,
        0, 0, 1, 99,
        0, 1, 1, 99
    ];
    const indices = [
        99, 0, 1, 2, 3
    ];

    const bufferView = new G3D.BufferView({
        buffer: new G3D.Buffer({
            data: new Float32Array(vertices)
        }),
        byteStride: 4 * 4,
        byteOffset: 4 * 4
    });

    const eleBuffer = new G3D.ElementBuffer({
        data: new Uint32Array(indices)
    });

    const ebv1 = new G3D.ElementBufferView({
        buffer: eleBuffer,
        mode: 'LINES',
        count: 4,
        byteOffset: 4 * 1
    });

    const lm1 = new G3D.LineMesh(scene);
    lm1.geometry = new G3D.LineGeometry({
        vertices: bufferView,
        indices: {
            default: ebv1
        }
    });

    console.log(lm1.geometry.getBoundingBox());

    // const ebv2 = new G3D.ElementBufferView({
    //     buffer: eleBuffer,
    //     mode: 'LINES',
    //     count: 2,
    //     offset: 8
    // });

    // const lm2 = new G3D.LineMesh(scene);
    // lm2.geometry = new G3D.LineGeometry({
    //     vertices: bufferView,
    //     indices: {
    //         default: ebv2
    //     }
    // });

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();


}

export default main;