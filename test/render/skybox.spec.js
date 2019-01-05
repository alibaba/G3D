import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.radius = 10;
    camera.near = 0.001;
    camera.far = 1000;

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


        const app = {
            default: () => {
                scene.render();
            },

            rotate: () => {
                camera.alpha = 170;
                scene.render();
            }
        };
        
        callback(app);

    });

}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1CIh7AcbpK1RjSZFyXXX_qFXa-128-128.png',
    rotate: '//gw.alicdn.com/tfs/TB1c4SaAkvoK1RjSZFwXXciCFXa-128-128.png'
};

describe('skybox', function () {

    let images;
    let app;
    let canvas;

    before(function (done) {
        this.timeout(30000);
        loader.loadImageQueue(imageUrls, result => {
            images = result;
            canvas = initCanvas(128, 128);
            init(canvas, function (m) {
                app = m;
                done();
            });
        })
    })

    it('default', function () {
        app.default();
        expect(canvas).toRenderAs(images.default);
    });

    it('rotate', function () {
        app.rotate();
        expect(canvas).toRenderAs(images.rotate);
    });

});