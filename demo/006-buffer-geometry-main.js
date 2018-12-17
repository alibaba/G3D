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

    createMeshes();
    // createMeshesWithBuffers();
    // createMeshesSharedBuffers();
    // createMeshesSharedBuffersSO();

    function createMeshes() {
        const v1 = [
            1, 0, 0, // A
            1, 1, 0  // B
        ];
        const i1 = [0, 1];
        const m1 = new G3D.LineMesh(scene);
        m1.geometry = new G3D.LineGeometry({
            vertices: v1,
            indices: { default: i1 }
        });

        const v2 = [
            0, 0, 1, // C
            0, 1, 1  // D
        ];
        const i2 = [0, 1];
        const m2 = new G3D.LineMesh(scene);
        m2.geometry = new G3D.LineGeometry({
            vertices: v2,
            indices: { default: i2 }
        })

        return [m1, m2];
    }

    function createMeshesBuffers() {
        const v1 = [
            1, 0, 0, // A
            1, 1, 0  // B
        ];
        const v1Buffer = new G3D.Buffer({ data: new Float32Array(v1) });
        const v1BufferView = new G3D.BufferView({ buffer: v1Buffer });
        const i1 = [0, 1];
        const i1Buffer = new G3D.ElementBuffer({ data: new Uint16Array(i1) });
        const i1BufferView = new G3D.ElementBufferView({
            buffer: i1Buffer,
            mode: 'LINES',
            count: 2
        });
        const m1 = new G3D.LineMesh(scene);
        m1.geometry = new G3D.LineGeometry({
            vertices: v1BufferView,
            indices: { default: i1BufferView }
        });

        const v2 = [
            0, 0, 1, // C
            0, 1, 1  // D
        ];
        const v2Buffer = new G3D.Buffer({ data: new Float32Array(v2) });
        const v2BufferView = new G3D.BufferView({ buffer: v2Buffer });
        const i2 = [0, 1];
        const i2Buffer = new G3D.ElementBuffer({ data: new Uint16Array(i2) });
        const i2BufferView = new G3D.ElementBufferView({ buffer: i2Buffer, mode: 'LINES', count: 2 });
        const m2 = new G3D.LineMesh(scene);
        m2.geometry = new G3D.LineGeometry({
            vertices: v2BufferView,
            indices: { default: i2BufferView }
        })

        return [m1, m2];
    }

    function createMeshesSharedBuffers() {
        const v = [
            1, 0, 0, // A
            1, 1, 0, // B
            0, 0, 1, // C
            0, 1, 1  // D
        ];
        const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });
        const vBufferView = new G3D.BufferView({ buffer: vBuffer });
        const i = [0, 1, 2, 3];
        const iBuffer = new G3D.ElementBuffer({ data: new Uint16Array(i) });

        const iBufferView1 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'LINES',
            count: 2
        });
        const iBufferView2 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'LINES',
            byteOffset: 4 * 2,
            count: 2
        });

        const m1 = new G3D.LineMesh(scene);
        m1.geometry = new G3D.LineGeometry({
            vertices: vBufferView,
            indices: { default: iBufferView1 }
        });

        const m2 = new G3D.LineMesh(scene);
        m2.geometry = new G3D.LineGeometry({
            vertices: vBufferView,
            indices: { default: iBufferView2 }
        })

        return [m1, m2];
    }

    function createMeshesSharedBuffersSO() {
        const v = [
            99, 99,
            1, 0, 0, 99,  // A
            1, 1, 0, 99,  // B
            0, 0, 1, 99,  // C
            0, 1, 1, 99   // D
        ];
        const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });
        const vBufferView = new G3D.BufferView({
            buffer: vBuffer,
            byteOffset: 4 * 2,
            byteStride: 4 * 4
        });
        const i = [0, 1, 2, 3];
        const iBuffer = new G3D.ElementBuffer({ data: new Uint16Array(i) });

        const iBufferView1 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'LINES',
            count: 2
        });
        const iBufferView2 = new G3D.ElementBufferView({
            buffer: iBuffer,
            mode: 'LINES',
            byteOffset: 4 * 2,
            count: 2
        });

        const m1 = new G3D.LineMesh(scene);
        m1.geometry = new G3D.LineGeometry({
            vertices: vBufferView,
            indices: { default: iBufferView1 }
        });

        const m2 = new G3D.LineMesh(scene);
        m2.geometry = new G3D.LineGeometry({
            vertices: vBufferView,
            indices: { default: iBufferView2 }
        })

        return [m1, m2];
    }

    function render() {
        scene.render();
        requestAnimationFrame(render);
    }
    render();
}

export default main;