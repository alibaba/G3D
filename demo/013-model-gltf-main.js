function main(
    G3D,
    { canvas, requestAnimationFrame, loader, pbrAssets }
) {

    const models = {
        damagedHelmet: {
            uri: '//g.alicdn.com/gama/assets/0.0.16/assets/gltf/DamagedHelmet/DamagedHelmet.gltf.json',
            cameraRadius: 2.8
        },
        metalRoughSpheres: {
            uri: '//g.alicdn.com/gama/assets/0.0.15/assets/gltf/MetalRoughSpheres/MetalRoughSpheres.gltf.json',
            cameraRadius: 25
        },
        avocado: {
            uri: '//g.alicdn.com/gama/assets/0.0.21/assets/gltf/Avocado/Avocado.gltf.json',
            cameraRadius: 0.3
        },
        corset: {
            uri: '//g.alicdn.com/gama/assets/0.0.21/assets/gltf/Corset/Corset.gltf.json',
            cameraRadius: 3
        }
    }

    const model = models['corset'];

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 80;
    camera.beta = 30;
    camera.near = 0.001;
    camera.far = model.cameraRadius * 3;
    camera.radius = model.cameraRadius;

    pbrAssets((specular, diffuse, brdfLUT) => {

        const pbrEnv = new G3D.PBREnviroment({ specular, diffuse, brdfLUT });

        loader.loadText(model.uri, (text) => {

            G3D.MeshBuilder.createCoordinate(scene, 500);

            const gltf = JSON.parse(text);

            let i = 0;

            gltf.buffers.forEach(buffer => {

                if (typeof buffer.uri === 'string') {
                    buffer.uri = [buffer.uri];
                }

                loader.loadTextQueue(buffer.uri, textList => {

                    const str = textList.join('');
                    const arr = new Uint16Array(str.split(';').map(Number));
                    buffer.data = arr.buffer;
                    i++;
                    check();

                })
            });

            gltf.images.forEach(image => {

                if (image.uri) {
                    loader.loadImage(image.uri, imageData => {
                        image.data = imageData;
                        i++;
                        check();
                    })
                } else {
                    i++;
                    check();
                }

            });

            function check() {
                if (i === gltf.buffers.length + gltf.images.length) {
                    init(gltf, pbrEnv);
                }
            }
        });
    });

    function init(gltf, pbrEnv) {

        const light1 = new G3D.DirectionalLight(scene);
        light1.direction = { x: 1, y: -1, z: 0 };
        light1.intensity = 0.2;

        const meshes = G3D.MeshBuilder.createMeshFromGLTF(scene, gltf, pbrEnv);

        meshes.forEach(m => m.rotation.y = 225);

        function render() {

            meshes.forEach(m => m.rotation.y += 0.1);

            scene.render();
            requestAnimationFrame(render);
        }
        render();
    }

}

export default main;