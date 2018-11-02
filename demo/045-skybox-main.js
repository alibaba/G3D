function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {
    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 10;
    camera.near = 0.001;
    camera.far = 1000;

    controlArcRotateCamera(canvas, camera);

    loader.loadImageQueue({
        front: '//gw.alicdn.com/tfs/TB1qZBqATtYBeNjy1XdXXXXyVXa-1024-1024.png',
        back: '//gw.alicdn.com/tfs/TB1O4QUAqmWBuNjy1XaXXXCbXXa-1024-1024.png',
        left: '//gw.alicdn.com/tfs/TB16.OnAwmTBuNjy1XbXXaMrVXa-1024-1024.png',
        right: '//gw.alicdn.com/tfs/TB1zIBqATtYBeNjy1XdXXXXyVXa-1024-1024.png',
        top: '//gw.alicdn.com/tfs/TB1wcxqATtYBeNjy1XdXXXXyVXa-1024-1024.png',
        bottom: '//gw.alicdn.com/tfs/TB1O7C5AAyWBuNjy0FpXXassXXa-1024-1024.png',
    }, ({ front, back, left, right, top, bottom }) => {

        new G3D.Skybox(scene, {
            front, back,
            left, right,
            top, bottom,
        });

        function render() {
            scene.render();
            requestAnimationFrame(render);
        }

        render();

    });


}

export default main;