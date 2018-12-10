function main(
    G3D,
    { canvas, requestAnimationFrame, loader }
) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 20;
    camera.beta = 30;
    camera.radius = 8;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 1.5;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;

    let mesh = null;
    loader.loadTextQueue(
        [
            'https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.obj',
            'https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.mtl'
        ],
        function ([obj, mtl]) {

            const k1 = '//img.alicdn.com/tfs/TB1AquIiC_I8KJjy0FoXXaFnVXa-512-512.jpg';
            const k2 = '//img.alicdn.com/tfs/TB1AquIiC_I8KJjy0FoXXaFnVXa-512-512.jpg';

            loader.loadImageQueue(['https:' + k1, 'https:' + k2], function ([image1, image2]) {
                const images = {
                    [k1]: image1,
                    [k2]: image2
                };
                mesh = G3D.MeshBuilder.createFromObjModel(scene, { obj, mtl, images });
            })
        }
    );

    function render() {
        if (mesh) {
            mesh.rotation.y += 1;
        }
        scene.render();
        requestAnimationFrame(render);
    }
    render();
}

export default main;