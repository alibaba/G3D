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
    light1.direction = { x: 3, y: 1, z: 1 };
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.2;

    G3D.MeshBuilder.createCoordinate(scene, 4);

    createMeshes();

    function createMeshes() {
        const v = [
            0, 0, 2, 1, 0, 0, 0, 0,
            0, 0, 1, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 1, 0, 0,
            2, 0, 0, 0, 0, 1, 0, 0,
            1, 1, 0, 0, 0, 1, 0, 0
        ];
        const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });

        const verticesBufferView = new G3D.BufferView({
            buffer: vBuffer,
            byteStride: 4 * 8,
            byteOffset: 0
        });
        const normalsBufferView = new G3D.BufferView({
            buffer: vBuffer,
            byteStride: 4 * 8,
            byteOffset: 4 * 3
        });
        const uvsBufferView = new G3D.BufferView({
            buffer: vBuffer,
            byteStride: 4 * 8,
            byteOffset: 4 * 6
        });

        const i = [0, 1, 2, 3, 4, 5];
        const iBuffer = new G3D.ElementBuffer({ data: new Uint16Array(i) });
        const iBufferView1 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'TRIANGLES',
            count: 3
        });
        const iBufferView2 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'TRIANGLES',
            count: 3,
            byteOffset: 2 * 3
        });

        const m1 = new G3D.Mesh(scene);
        m1.geometry = new G3D.Geometry({
            vertices: verticesBufferView,
            normals: normalsBufferView,
            uvs: uvsBufferView,
            indices: { default: iBufferView1 }
        });

        const m2 = new G3D.Mesh(scene);
        m2.geometry = new G3D.Geometry({
            vertices: verticesBufferView,
            normals: normalsBufferView,
            uvs: uvsBufferView,
            indices: { default: iBufferView2 }
        });
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();
}

export default main;