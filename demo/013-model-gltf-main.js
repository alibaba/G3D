function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader, pbrAssets }
) {

    pbrAssets('default').ready((specular, diffuse, lut) => {

        loader.loadText('//g.alicdn.com/gama/assets/0.0.15/assets/gltf/MetalRoughSpheres/MetalRoughSpheres.gltf.json', (text) => {

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
                    init(gltf, { specular, diffuse, lut });
                }
            }
        });
    });

    function init(gltf, { specular, diffuse, lut }) {

        const engine = new G3D.Engine(canvas);

        const scene = new G3D.Scene(engine);

        const camera = new G3D.RotatePerspectiveCamera(scene);
        camera.alpha = 175;
        camera.beta = 15;
        camera.radius = 25;

        controlArcRotateCamera(canvas, camera);

        const light1 = new G3D.DirectionalLight(scene);
        light1.direction.x = 1;
        light1.direction.y = -1;
        light1.direction.z = 0;
        light1.intensity = 0.2;

        const light2 = new G3D.AmbientLight(scene);
        light2.intensity = 0.2;

        const coord = G3D.MeshBuilder.createCoordinate(scene, 100);

        G3D.MeshBuilder.createMeshFromGLTF(scene, gltf, { specular, diffuse, lut });

        function render() {
            scene.render();
            requestAnimationFrame(render);
        }
        render();
    }

}

export default main;